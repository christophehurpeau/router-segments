'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const nightingaleLogger = require('nightingale-logger');
const pathToRegExp = require('path-to-regexp');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e["default"] : e; }

const pathToRegExp__default = /*#__PURE__*/_interopDefaultLegacy(pathToRegExp);

/* eslint-disable complexity */
const logger = process.env.NODE_ENV !== "production" ? new nightingaleLogger.Logger('router-segments:findMatch') : undefined;

const parseOtherParams = wildcard => wildcard ? wildcard.split('/') : [];

const internalFindMatch = (path, completePath, routes, locale = 'en', namedParams) => {
  let result = null;
  routes.some(route => {
    const routePath = route.getPath(locale);

    if (process.env.NODE_ENV !== "production" && !routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }
    /* istanbul ignore next */


    if (process.env.NODE_ENV !== "production" && logger) {
      logger.debug(`trying ${routePath.regExp.toString()}`);
    }

    const match = routePath.regExp.exec(path);
    if (!match) return false;
    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length > 0) {
      // set params
      if (!namedParams) namedParams = new Map();
      routePath.namedParams.forEach(paramName => {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      const segment = route;
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = internalFindMatch(`/${restOfThePath}`, completePath, segment.nestedRoutes, locale, namedParams);
        return result !== null;
      }

      if (!segment.defaultRoute) {
        return false;
      }

      route = segment.defaultRoute;
    }

    const endRoute = route;
    const otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);
    result = Object.freeze({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref: endRoute.ref,
      path: completePath,
      route: endRoute,
      routePath,
      namedParams,
      otherParams
    });
    return true;
  });
  return result;
};

function findMatch(path, routes, locale) {
  return internalFindMatch(path, path, routes, locale);
}

function createRouter(routes, routeMap) {
  const getRequiredRoute = routeKey => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: getRequiredRoute,
    find: (path, locale) => findMatch(path, routes, locale),
    toPath: (key, args) => getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (locale, key, args) => getRequiredRoute(key).getPath(locale).toPath(args)
  };
}

const getKeys = o => Object.keys(o);

class LocalizedEndRoute {
  constructor(localizedPaths, ref) {
    this.localizedPaths = localizedPaths; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale);
  }

  isSegment() {
    return false;
  }

  isLocalized() {
    return true;
  }

  toJSON() {
    return [...this.localizedPaths.entries()];
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

}

class LocalizedSegmentRoute {
  nestedRoutes = [];

  constructor(localizedPaths) {
    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale);
  }

  isSegment() {
    return true;
  }

  isLocalized() {
    return true;
  }

  toJSON() {
    return [...this.localizedPaths.entries()];
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

}

class NotLocalizedEndRoute {
  constructor(path, ref) {
    this.path = path; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.ref = ref; // Object.freeze(this);
  }

  getPath() {
    return this.path;
  }

  isSegment() {
    return false;
  }

  isLocalized() {
    return false;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

}

class NotLocalizedSegmentRoute {
  nestedRoutes = [];

  constructor(path) {
    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    return this.path;
  }

  isSegment() {
    return true;
  }

  isLocalized() {
    return false;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

}

function internalCreateRoutePath(path, completePath, segment) {
  const keys = [];
  const regExp = pathToRegExp__default(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);
  if (segment) return {
    path,
    completePath,
    regExp,
    namedParams
  };
  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp__default.compile(completePath)
  };
}

const createRoutePathSegment = (path, completePath) => internalCreateRoutePath(path, completePath, true);
const createRoutePath = (path, completePath) => internalCreateRoutePath(path, completePath, false);

const createLocalizedPaths = (localizedPathsRecord, completeLocalizedPathsRecord, segment) => {
  const localizedPaths = new Map();
  getKeys(localizedPathsRecord).forEach(locale => {
    const path = localizedPathsRecord[locale];

    if (segment) {
      const routerPath = createRoutePathSegment(path, completeLocalizedPathsRecord[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = createRoutePath(path, completeLocalizedPathsRecord[locale]);
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = ref => {
  if (!ref) throw new Error(`Invalid ref: "${JSON.stringify(ref)}"`);
};

const createRoute = (path, completePath, ref) => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") checkRef(ref);
  const routePath = createRoutePath(path, completePath);
  return new NotLocalizedEndRoute(routePath, ref);
};
const createLocalizedRoute = (localizedPathsRecord, completeLocalizedPathsRecord, ref) => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") checkRef(ref);
  const localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, false);
  return new LocalizedEndRoute(localizedPaths, ref);
};
const createSegmentRoute = (path, completePath) => {
  const routePath = createRoutePathSegment(path, completePath);
  return new NotLocalizedSegmentRoute(routePath);
};
const createLocalizedSegmentRoute = (localizedPathsRecord, completeLocalizedPathsRecord) => {
  const localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  const createSegmentRouterBuilder = segmentRoute => {
    const getCompletePath = (path, locale) => `${segmentRoute.getPath(locale).completePath}${path}`;

    const getCompleteLocalizedPaths = localizedPaths => {
      const completeLocalizedPaths = {};
      getKeys(localizedPaths).forEach(locale => {
        completeLocalizedPaths[locale] = getCompletePath(localizedPaths[locale], locale);
      });
      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = (segmentRoute, path) => {
      const localizedPaths = {};
      [...segmentRoute.localizedPaths.keys()].forEach(locale => {
        localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    const _createLocalizedEndRoute = (localizedPaths, ref, key) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = key || completeLocalizedPaths[defaultLocale];
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = (path, ref, key) => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(segmentRoute, path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      addToRouteMap(key || completePath, route);
      return route;
    };

    const _createLocalizedSegmentRoute = (localizedPaths, buildSegment) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (path, buildSegment) => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(segmentRoute, path), buildSegment);
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: (ref, key) => {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },
      add: (path, ref, key) => {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },
      addLocalized: (localizedPaths, ref, key) => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },
      addSegment: (path, buildSegment) => {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },
      addLocalizedSegment: (localizedPaths, buildSegment) => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };

  return createSegmentRouterBuilder;
}

function createRouterBuilder(locales) {
  const defaultLocale = locales?.[0];
  const routes = [];
  const routeMap = new Map();

  const addToRouteMap = (key, route) => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);
  return {
    add: (path, ref, key) => {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },
    addLocalized: (localizedPaths, ref, key) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },
    addSegment: (path, buildSegment) => {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },
    addLocalizedSegment: (localizedPaths, buildSegment) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },
    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap)
  };
}

exports.createRouterBuilder = createRouterBuilder;
//# sourceMappingURL=index-node14.cjs.map

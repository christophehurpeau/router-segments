import pathToRegExp from 'path-to-regexp';

const getKeys = function getKeys(o) {
  return Object.keys(o);
};

function internalCreateRoutePath(path, completePath, segment) {
  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);
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
    toPath: pathToRegExp.compile(completePath)
  };
}

const createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};
const createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};

class NotLocalizedEndRoute {
  constructor(path, ref) {
    this.path = path;
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

class LocalizedEndRoute {
  constructor(localizedPaths, ref) {
    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
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

class NotLocalizedSegmentRoute {
  constructor(path) {
    this.nestedRoutes = [];
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

class LocalizedSegmentRoute {
  constructor(localizedPaths) {
    this.nestedRoutes = [];
    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
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

const createLocalizedPaths = function createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, segment) {
  const localizedPaths = new Map();
  getKeys(localizedPathsRecord).forEach(function (locale) {
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

const createRoute = function createRoute(path, completePath, ref) {
  const routePath = createRoutePath(path, completePath);
  return new NotLocalizedEndRoute(routePath, ref);
};
const createLocalizedRoute = function createLocalizedRoute(localizedPathsRecord, completeLocalizedPathsRecord, ref) {
  const localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, false);
  return new LocalizedEndRoute(localizedPaths, ref);
};
const createSegmentRoute = function createSegmentRoute(path, completePath) {
  const routePath = createRoutePathSegment(path, completePath);
  return new NotLocalizedSegmentRoute(routePath);
};
const createLocalizedSegmentRoute = function createLocalizedSegmentRoute(localizedPathsRecord, completeLocalizedPathsRecord) {
  const localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

const parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

const internalFindMatch = function internalFindMatch(path, completePath, routes, locale = 'en', namedParams) {
  let result = null;
  routes.some(function (route) {
    const routePath = route.getPath(locale);
    const match = routePath.regExp.exec(path);
    if (!match) return false;
    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = new Map();
      routePath.namedParams.forEach(function (paramName) {
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
  const getRequiredRoute = function getRequiredRoute(routeKey) {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: getRequiredRoute,
    find: function find(path, locale) {
      return findMatch(path, routes, locale);
    },
    toPath: function toPath(key, args) {
      return getRequiredRoute(key).getPath().toPath(args);
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      return getRequiredRoute(key).getPath(locale).toPath(args);
    }
  };
}

function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  const createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    const getCompletePath = function getCompletePath(path, locale) {
      return `${segmentRoute.getPath(locale).completePath}${path}`;
    };

    const getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      const completeLocalizedPaths = {};
      getKeys(localizedPaths).forEach(function (locale) {
        completeLocalizedPaths[locale] = getCompletePath(localizedPaths[locale], locale);
      });
      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = function createLocalizedPathFromSegment(segmentRoute, path) {
      const localizedPaths = {};
      [...segmentRoute.localizedPaths.keys()].forEach(function (locale) {
        localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    const _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = key || completeLocalizedPaths[defaultLocale];
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = function _createEndRoute(path, ref, key) {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(segmentRoute, path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      addToRouteMap(key || completePath, route);
      return route;
    };

    const _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
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
      defaultRoute: function defaultRoute(ref, key) {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },
      add: function add(path, ref, key) {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },
      addLocalized: function addLocalized(localizedPaths, ref, key) {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },
      addSegment: function addSegment(path, buildSegment) {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },
      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };

  return createSegmentRouterBuilder;
}

function createRouterBuilder(locales) {
  const defaultLocale = locales === null || locales === void 0 ? void 0 : locales[0];
  const routes = [];
  const routeMap = new Map();

  const addToRouteMap = function addToRouteMap(key, route) {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);
  return {
    add: function add(path, ref, key) {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },
    addLocalized: function addLocalized(localizedPaths, ref, key) {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },
    addSegment: function addSegment(path, buildSegment) {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },
    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },
    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter$1() {
      return createRouter(routes, routeMap);
    }
  };
}

export default createRouterBuilder;
//# sourceMappingURL=index-browsermodern.es.js.map

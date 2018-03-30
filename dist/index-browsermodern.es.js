import pathToRegExp from 'path-to-regexp';

const internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath)
  };
};

const createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};

const createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};

let EndRoute = class {

  constructor(path, ref) {
    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath() {
    return this.path;
  }

  isSegment() {
    return false;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

let LocalizedEndRoute = class {

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

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

let SegmentRoute = class {

  constructor(path) {
    this.nestedRoutes = [];

    this.path = path;
  }
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze


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

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

let LocalizedSegmentRoute = class {

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

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};

const createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = createRoutePathSegment(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = createRoutePath(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const createRoute = function createRoute(path, completePath, ref) {
  const routePath = createRoutePath(path, completePath);
  return new EndRoute(routePath, ref);
};

const createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new LocalizedEndRoute(localizedPaths, ref);
};

const createSegmentRoute = function createSegmentRoute(path, completePath) {
  const routePath = createRoutePathSegment(path, completePath);
  return new SegmentRoute(routePath);
};

const createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

const parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

const findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
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
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch(`/${restOfThePath}`, completePath, route.nestedRoutes, locale, namedParams);

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = route.defaultRoute;
    }

    const otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route,
      routePath,
      namedParams,
      otherParams
    });

    return true;
  });

  return result;
};

var findMatch$1 = (function (path, routes, locale = 'en') {
  return findMatch(path, path, routes, locale);
});

var _createRouter = (function (routes, routeMap) {
  const getRequiredRoute = function getRequiredRoute(routeKey) {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: function get(key) {
      return getRequiredRoute(key);
    },
    find: function find(path, locale) {
      return findMatch$1(path, routes, locale);
    },
    toPath: function toPath(key, args) {
      return getRequiredRoute(key).getPath().toPath(args);
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      return getRequiredRoute(key).getPath(locale).toPath(args);
    }
  };
});

var createSegmentRouterBuilderCreator = (function (defaultLocale, addToRouteMap) {
  const createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    const getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    const getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return `${segmentRoute.path.completePath}${path}`;
      } : function (path, locale) {
        return `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
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
      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
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
      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
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
});

var createRouterBuilder = (function (locales) {
  const defaultLocale = locales && locales[0];
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
    createRouter: function createRouter() {
      return _createRouter(routes, routeMap);
    }
  };
});

export default createRouterBuilder;
//# sourceMappingURL=index-browsermodern.es.js.map

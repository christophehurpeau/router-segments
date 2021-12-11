import { Logger } from 'nightingale-logger';
import pathToRegExp from 'path-to-regexp';

/* eslint-disable complexity */
var logger = process.env.NODE_ENV !== "production" ? new Logger('router-segments:findMatch') : undefined;

var parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

var internalFindMatch = function internalFindMatch(path, completePath, routes, locale, namedParams) {
  if (locale === void 0) {
    locale = 'en';
  }

  var result = null;
  routes.some(function (route) {
    var routePath = route.getPath(locale);

    if (process.env.NODE_ENV !== "production" && !routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }
    /* istanbul ignore next */


    if (process.env.NODE_ENV !== "production" && logger) {
      logger.debug(`trying ${routePath.regExp.toString()}`);
    }

    var match = routePath.regExp.exec(path);
    if (!match) return false;
    match.shift(); // remove m[0], === path;

    var groupCount = match.length;
    var group = 0;

    if (routePath.namedParams.length > 0) {
      // set params
      if (!namedParams) namedParams = new Map();
      routePath.namedParams.forEach(function (paramName) {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      var segment = route;
      var restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = internalFindMatch(`/${restOfThePath}`, completePath, segment.nestedRoutes, locale, namedParams);
        return result !== null;
      }

      if (!segment.defaultRoute) {
        return false;
      }

      route = segment.defaultRoute;
    }

    var endRoute = route;
    var otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);
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
  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var route = routeMap.get(routeKey);
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

var getKeys = function getKeys(o) {
  return Object.keys(o);
};

var LocalizedEndRoute = /*#__PURE__*/function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    this.localizedPaths = localizedPaths; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.ref = ref;
    Object.freeze(this);
  }

  var _proto = LocalizedEndRoute.prototype;

  _proto.getPath = function getPath(locale) {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale);
  };

  _proto.isSegment = function isSegment() {
    return false;
  };

  _proto.isLocalized = function isLocalized() {
    return true;
  };

  _proto.toJSON = function toJSON() {
    return [].concat(this.localizedPaths.entries());
  };

  _proto.toString = function toString() {
    return JSON.stringify(this.toJSON());
  };

  return LocalizedEndRoute;
}();

var LocalizedSegmentRoute = /*#__PURE__*/function () {
  function LocalizedSegmentRoute(localizedPaths) {
    this.nestedRoutes = [];
    this.localizedPaths = localizedPaths;
  }

  var _proto = LocalizedSegmentRoute.prototype;

  _proto.freeze = function freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  };

  _proto.getPath = function getPath(locale) {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale);
  };

  _proto.isSegment = function isSegment() {
    return true;
  };

  _proto.isLocalized = function isLocalized() {
    return true;
  };

  _proto.toJSON = function toJSON() {
    return [].concat(this.localizedPaths.entries());
  };

  _proto.toString = function toString() {
    return JSON.stringify(this.toJSON());
  };

  return LocalizedSegmentRoute;
}();

var NotLocalizedEndRoute = /*#__PURE__*/function () {
  function NotLocalizedEndRoute(path, ref) {
    this.path = path; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.ref = ref; // Object.freeze(this);
  }

  var _proto = NotLocalizedEndRoute.prototype;

  _proto.getPath = function getPath() {
    return this.path;
  };

  _proto.isSegment = function isSegment() {
    return false;
  };

  _proto.isLocalized = function isLocalized() {
    return false;
  };

  _proto.toJSON = function toJSON() {
    return this.path;
  };

  _proto.toString = function toString() {
    return JSON.stringify(this.toJSON());
  };

  return NotLocalizedEndRoute;
}();

var NotLocalizedSegmentRoute = /*#__PURE__*/function () {
  function NotLocalizedSegmentRoute(path) {
    this.nestedRoutes = [];
    this.path = path;
  }

  var _proto = NotLocalizedSegmentRoute.prototype;

  _proto.freeze = function freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  };

  _proto.getPath = function getPath() {
    return this.path;
  };

  _proto.isSegment = function isSegment() {
    return true;
  };

  _proto.isLocalized = function isLocalized() {
    return false;
  };

  _proto.toJSON = function toJSON() {
    return this.path;
  };

  _proto.toString = function toString() {
    return JSON.stringify(this.toJSON());
  };

  return NotLocalizedSegmentRoute;
}();

function internalCreateRoutePath(path, completePath, segment) {
  var keys = [];
  var regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
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

var createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};
var createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};

var createLocalizedPaths = function createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, segment) {
  var localizedPaths = new Map();
  getKeys(localizedPathsRecord).forEach(function (locale) {
    var path = localizedPathsRecord[locale];

    if (segment) {
      var routerPath = createRoutePathSegment(path, completeLocalizedPathsRecord[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = createRoutePath(path, completeLocalizedPathsRecord[locale]);

      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  if (!ref) throw new Error(`Invalid ref: "${JSON.stringify(ref)}"`);
};

var createRoute = function createRoute(path, completePath, ref) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") checkRef(ref);
  var routePath = createRoutePath(path, completePath);
  return new NotLocalizedEndRoute(routePath, ref);
};
var createLocalizedRoute = function createLocalizedRoute(localizedPathsRecord, completeLocalizedPathsRecord, ref) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") checkRef(ref);
  var localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, false);
  return new LocalizedEndRoute(localizedPaths, ref);
};
var createSegmentRoute = function createSegmentRoute(path, completePath) {
  var routePath = createRoutePathSegment(path, completePath);
  return new NotLocalizedSegmentRoute(routePath);
};
var createLocalizedSegmentRoute = function createLocalizedSegmentRoute(localizedPathsRecord, completeLocalizedPathsRecord) {
  var localizedPaths = createLocalizedPaths(localizedPathsRecord, completeLocalizedPathsRecord, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var getCompletePath = function getCompletePath(path, locale) {
      return `${segmentRoute.getPath(locale).completePath}${path}`;
    };

    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var completeLocalizedPaths = {};
      getKeys(localizedPaths).forEach(function (locale) {
        completeLocalizedPaths[locale] = getCompletePath(localizedPaths[locale], locale);
      });
      return completeLocalizedPaths;
    };

    var createLocalizedPathFromSegment = function createLocalizedPathFromSegment(segmentRoute, path) {
      var localizedPaths = {};
      [].concat(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    var _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var finalKey = key || completeLocalizedPaths[defaultLocale];
      var route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createEndRoute = function _createEndRoute(path, ref, key) {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(segmentRoute, path), ref, key);
      }

      var completePath = getCompletePath(path);
      var route = createRoute(path, completePath, ref);
      addToRouteMap(key || completePath, route);
      return route;
    };

    var _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    var _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(segmentRoute, path), buildSegment);
      }

      var completePath = getCompletePath(path);
      var route = createSegmentRoute(path, completePath);
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
  var defaultLocale = locales == null ? void 0 : locales[0];
  var routes = [];
  var routeMap = new Map();

  var addToRouteMap = function addToRouteMap(key, route) {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  var createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);
  return {
    add: function add(path, ref, key) {
      var route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },
    addLocalized: function addLocalized(localizedPaths, ref, key) {
      if (!defaultLocale) throw new Error('Invalid locales');
      var route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      var finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },
    addSegment: function addSegment(path, buildSegment) {
      var route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },
    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      if (!defaultLocale) throw new Error('Invalid locales');
      var route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
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

export { createRouterBuilder };
//# sourceMappingURL=index-browser.es.js.map

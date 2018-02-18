import pathToRegExp from 'path-to-regexp';

var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var keys = [];
  var regExp = pathToRegExp(segment ? path + '/(.+)?' : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return { path: path, completePath: completePath, regExp: regExp, namedParams: namedParams };

  return {
    path: path,
    completePath: completePath,
    regExp: regExp,
    namedParams: namedParams,
    toPath: pathToRegExp.compile(completePath)
  };
};

var createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};

var createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var EndRoute = function () {
  function EndRoute(path, ref) {
    classCallCheck(this, EndRoute);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  createClass(EndRoute, [{
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return false;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.path;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return EndRoute;
}();

var LocalizedEndRoute = function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    classCallCheck(this, LocalizedEndRoute);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  createClass(LocalizedEndRoute, [{
    key: 'getPath',
    value: function getPath(locale) {
      return this.localizedPaths.get(locale);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return false;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return Array.from(this.localizedPaths.entries());
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return LocalizedEndRoute;
}();

var SegmentRoute = function () {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  function SegmentRoute(path) {
    classCallCheck(this, SegmentRoute);
    this.nestedRoutes = [];

    this.path = path;
  }

  createClass(SegmentRoute, [{
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this);
      Object.freeze(this.nestedRoutes);
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      return this.path;
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.path;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return SegmentRoute;
}();

var LocalizedSegmentRoute = function () {
  function LocalizedSegmentRoute(localizedPaths) {
    classCallCheck(this, LocalizedSegmentRoute);
    this.nestedRoutes = [];

    this.localizedPaths = localizedPaths;
  }

  createClass(LocalizedSegmentRoute, [{
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this);
      Object.freeze(this.nestedRoutes);
    }
  }, {
    key: 'getPath',
    value: function getPath(locale) {
      return this.localizedPaths.get(locale);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return true;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return Array.from(this.localizedPaths.entries());
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);
  return LocalizedSegmentRoute;
}();

var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = createRoutePathSegment(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = createRoutePath(path, completePathDictionary[locale]);
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var createRoute = function createRoute(path, completePath, ref) {
  var routePath = createRoutePath(path, completePath);
  return new EndRoute(routePath, ref);
};

var createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new LocalizedEndRoute(localizedPaths, ref);
};

var createSegmentRoute = function createSegmentRoute(path, completePath) {
  var routePath = createRoutePathSegment(path, completePath);
  return new SegmentRoute(routePath);
};

var createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

var parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

var findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  var result = null;

  routes.some(function (route) {
    var routePath = route.getPath(locale);

    var match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    var groupCount = match.length;
    var group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach(function (paramName) {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      var restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch('/' + restOfThePath, completePath, route.nestedRoutes, locale, namedParams);

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = route.defaultRoute;
    }

    var otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route: route,
      routePath: routePath,
      namedParams: namedParams,
      otherParams: otherParams
    });

    return true;
  });

  return result;
};

var findMatch$1 = (function (path, routes) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  return findMatch(path, path, routes, locale);
});

var _createRouter = (function (routes, routeMap) {
  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var route = routeMap.get(routeKey);
    if (!route) throw new Error('No route named "' + routeKey + '"');
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
  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var completeLocalizedPaths = {};

      var getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return '' + segmentRoute.path.completePath + path;
      } : function (path, locale) {
        return '' + segmentRoute.localizedPaths.get(locale).completePath + path;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return completeLocalizedPaths;
    };

    var createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      var localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
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
      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
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
      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
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
});

var createRouterBuilder = (function (locales) {
  var defaultLocale = locales && locales[0];
  var routes = [];
  var routeMap = new Map();

  var addToRouteMap = function addToRouteMap(key, route) {
    if (routeMap.has(key)) throw new Error('"' + key + '" is already used');
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
    createRouter: function createRouter() {
      return _createRouter(routes, routeMap);
    }
  };
});

export default createRouterBuilder;
//# sourceMappingURL=index-browser.es.js.map

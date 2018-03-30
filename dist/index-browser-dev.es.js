import t from 'flow-runtime';
import pathToRegExp from 'path-to-regexp';
import Logger from 'nightingale-logger';

var RouteRefType = t.type("RouteRefType", t.any());

var RoutePathType = t.type("RoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string())), t.property("toPath", t.function(t.param("args", t.object()), t.return(t.string())))));

var SegmentRoutePathType = t.type("SegmentRoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string()))));

var LocaleType = t.type("LocaleType", t.string());

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

var RoutePathType$1 = t.tdz(function () {
  return RoutePathType;
});
var RouteRefType$1 = t.tdz(function () {
  return RouteRefType;
});

var EndRoute = function () {
  function EndRoute(path, ref) {
    classCallCheck(this, EndRoute);

    var _pathType = t.ref(RoutePathType$1);

    var _refType = t.ref(RouteRefType$1);

    t.param('path', _pathType).assert(path);
    t.param('ref', _refType).assert(ref);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  createClass(EndRoute, [{
    key: 'getPath',
    value: function getPath() {
      var _returnType = t.return(t.ref(RoutePathType$1));

      return _returnType.assert(this.path);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

      return _returnType2.assert(false);
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

var LocaleType$1 = t.tdz(function () {
  return LocaleType;
});
var RoutePathType$2 = t.tdz(function () {
  return RoutePathType;
});
var RouteRefType$2 = t.tdz(function () {
  return RouteRefType;
});

var LocalizedEndRoute = function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    classCallCheck(this, LocalizedEndRoute);

    var _localizedPathsType = t.ref('Map', t.ref(LocaleType$1), t.ref(RoutePathType$2));

    var _refType = t.ref(RouteRefType$2);

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
    t.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  createClass(LocalizedEndRoute, [{
    key: 'getPath',
    value: function getPath(locale) {
      var _localeType = t.ref(LocaleType$1);

      var _returnType = t.return(t.nullable(t.ref(RoutePathType$2)));

      t.param('locale', _localeType).assert(locale);

      return _returnType.assert(this.localizedPaths.get(locale));
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

      return _returnType2.assert(false);
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

var Route = t.tdz(function () {
  return EndRoute;
});
var SegmentRoutePathType$1 = t.tdz(function () {
  return SegmentRoutePathType;
});

var SegmentRoute = function () {
  function SegmentRoute(path) {
    classCallCheck(this, SegmentRoute);
    this.nestedRoutes = [];

    var _pathType = t.ref(SegmentRoutePathType$1);

    t.param('path', _pathType).assert(path);

    this.path = path;
  }
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze


  createClass(SegmentRoute, [{
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this);
      Object.freeze(this.nestedRoutes);
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var _returnType = t.return(t.ref(SegmentRoutePathType$1));

      return _returnType.assert(this.path);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

      return _returnType2.assert(true);
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

var _dec, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['keys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['defineProperty'](target, property, desc);
    desc = null;
  }

  return desc;
}
var LocalizedRoute = t.tdz(function () {
  return LocalizedEndRoute;
});
var LocaleType$2 = t.tdz(function () {
  return LocaleType;
});
var SegmentRoutePathType$2 = t.tdz(function () {
  return SegmentRoutePathType;
});
var LocalizedSegmentRoute = (_dec = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _class = function () {
  function LocalizedSegmentRoute(localizedPaths) {
    classCallCheck(this, LocalizedSegmentRoute);

    _initDefineProp(this, 'nestedRoutes', _descriptor, this);

    var _localizedPathsType = t.ref('Map', t.ref(LocaleType$2), t.ref(SegmentRoutePathType$2));

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

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
      var _localeType = t.ref(LocaleType$2);

      var _returnType = t.return(t.nullable(t.ref(SegmentRoutePathType$2)));

      t.param('locale', _localeType).assert(locale);

      return _returnType.assert(this.localizedPaths.get(locale));
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

      return _returnType2.assert(true);
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
}(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'nestedRoutes', [_dec], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _class);

var RouteType = t.type('RouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute), t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
var SegmentRouteType = t.type('SegmentRouteType', t.union(t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
var EndRouteType = t.type('EndRouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute)));

var RouteRefType$3 = t.tdz(function () {
  return RouteRefType;
});
var RoutePathType$3 = t.tdz(function () {
  return RoutePathType;
});
var SegmentRoutePathType$3 = t.tdz(function () {
  return SegmentRoutePathType;
});
var LocaleType$3 = t.tdz(function () {
  return LocaleType;
});
var RouteType$1 = t.tdz(function () {
  return RouteType;
});
var EndRouteType$1 = t.tdz(function () {
  return EndRouteType;
});

var PathDictionaryType = t.type('PathDictionaryType', t.object(t.indexer('key', t.ref(LocaleType$3), t.string())));

var SegmentRouterBuilderType = t.type('SegmentRouterBuilderType', function (SegmentRouterBuilderType) {
  return t.exactObject(t.property('defaultRoute', t.function(t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))));
});

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

var RoutesType = t.type('RoutesType', t.array(t.ref(RouteType$1)));
var RouteMapType = t.type('RouteMapType', t.ref('Map', t.string(), t.ref(RouteType$1)));

var RouteMatchType = t.type('RouteMatchType', t.exactObject(t.property('ref', t.ref(RouteRefType$3)), t.property('path', t.string()), t.property('route', t.ref(RouteType$1)), t.property('routePath', t.union(t.ref(SegmentRoutePathType$3), t.ref(RoutePathType$3))), t.property('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.property('otherParams', t.nullable(t.array(t.string())))));

var RouterType = t.type('RouterType', t.exactObject(t.property('get', t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType$1))))), t.property('find', t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string()), true), t.return(t.nullable(RouteMatchType)))), t.property('toPath', t.function(t.param('key', t.string()), t.param('args', t.any()), t.return(t.string()))), t.property('toLocalizedPath', t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any()), t.return(t.string())))));

var RouterBuilderType = t.type('RouterBuilderType', t.exactObject(t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string()), true), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('getRoutes', t.function(t.return(RoutesType))), t.property('createRouter', t.function(t.return(RouterType)))));

var SegmentRoutePathType$4 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
var RoutePathType$4 = t.tdz(function () {
  return RoutePathType$3;
});
var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _segmentType = t.boolean();

  var _returnType = t.return(t.union(t.ref(SegmentRoutePathType$4), t.ref(RoutePathType$4)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('segment', _segmentType).assert(segment);

  var keys = [];
  var regExp = pathToRegExp(segment ? path + '(.*)?' : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return _returnType.assert({ path: path, completePath: completePath, regExp: regExp, namedParams: namedParams });

  return _returnType.assert({
    path: path,
    completePath: completePath,
    regExp: regExp,
    namedParams: namedParams,
    toPath: pathToRegExp.compile(completePath)
  });
};

var createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  var _pathType2 = t.string();

  var _completePathType2 = t.string();

  var _returnType2 = t.return(t.ref(SegmentRoutePathType$4));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);
  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
};

var createRoutePath = function createRoutePath(path, completePath) {
  var _pathType3 = t.string();

  var _completePathType3 = t.string();

  var _returnType3 = t.return(t.ref(RoutePathType$4));

  t.param('path', _pathType3).assert(path);
  t.param('completePath', _completePathType3).assert(completePath);
  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
};

var LocaleType$4 = t.tdz(function () {
  return LocaleType$3;
});
var PathDictionaryType$1 = t.tdz(function () {
  return PathDictionaryType;
});
var RoutePathType$5 = t.tdz(function () {
  return RoutePathType$3;
});
var SegmentRoutePathType$5 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
var RouteRefType$4 = t.tdz(function () {
  return RouteRefType$3;
});
var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var _pathDictionaryType = t.ref(PathDictionaryType$1);

  var _completePathDictionaryType = t.ref(PathDictionaryType$1);

  var _segmentType = t.boolean();

  t.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);
  t.param('segment', _segmentType).assert(segment);

  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var _localeType = t.ref(LocaleType$4);

    t.param('locale', _localeType).assert(locale);

    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = t.ref(SegmentRoutePathType$5).assert(createRoutePathSegment(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePathDictionary[locale]));
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  var _refType = t.any();

  t.param('ref', _refType).assert(ref);

  if (!ref) throw new Error('Invalid ref: "' + ref + '"');
};

var createRoute = function createRoute(path, completePath, ref) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _refType2 = t.ref(RouteRefType$4);

  var _returnType = t.return(t.ref(EndRoute));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var routePath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePath));
  return _returnType.assert(new EndRoute(routePath, ref));
};

var createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var _pathDictionaryType2 = t.ref(PathDictionaryType$1);

  var _completePathDictionaryType2 = t.ref(PathDictionaryType$1);

  var _refType3 = t.ref(RouteRefType$4);

  var _returnType2 = t.return(t.ref(LocalizedEndRoute));

  t.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);
  t.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new LocalizedEndRoute(localizedPaths, ref));
};

var createSegmentRoute = function createSegmentRoute(path, completePath) {
  var _pathType2 = t.string();

  var _completePathType2 = t.string();

  var _returnType3 = t.return(t.ref(SegmentRoute));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);

  var routePath = createRoutePathSegment(path, completePath);
  return _returnType3.assert(new SegmentRoute(routePath));
};

var createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var _pathDictionaryType3 = t.ref(PathDictionaryType$1);

  var _completePathDictionaryType3 = t.ref(PathDictionaryType$1);

  var _returnType4 = t.return(t.ref(LocalizedSegmentRoute));

  t.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new LocalizedSegmentRoute(localizedPaths));
};

var RouteType$2 = t.tdz(function () {
  return RouteType;
});
var RoutesType$1 = t.tdz(function () {
  return RoutesType;
});
var LocaleType$5 = t.tdz(function () {
  return LocaleType$3;
});
var RouteMatchType$1 = t.tdz(function () {
  return RouteMatchType;
});
var SegmentRoutePathType$6 = t.tdz(function () {
  return SegmentRoutePathType$3;
});
var RoutePathType$6 = t.tdz(function () {
  return RoutePathType$3;
});
var logger = new Logger('router-segments:findMatch');

var parseOtherParams = function parseOtherParams(wildcard) {
  var _wildcardType = t.string();

  t.param('wildcard', _wildcardType).assert(wildcard);
  return wildcard ? wildcard.split('/') : [];
};

var findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _routesType = t.ref(RoutesType$1);

  var _localeType = t.ref(LocaleType$5);

  var _namedParamsType = t.nullable(t.ref('Map', t.string(), t.string()));

  var _returnType = t.return(t.nullable(t.ref(RouteMatchType$1)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('routes', _routesType).assert(routes);
  t.param('locale', _localeType).assert(locale);
  t.param('namedParams', _namedParamsType).assert(namedParams);

  var result = null;

  routes.some(function (route) {
    var _routeType = t.ref(RouteType$2);

    t.param('route', _routeType).assert(route);

    var routePath = t.union(t.nullable(t.ref(SegmentRoutePathType$6)), t.ref(RoutePathType$6)).assert(route.getPath(locale));

    if (!routePath) {
      throw new Error('Unknown localized route for locale ' + locale);
    }

    /* istanbul ignore next */
    logger.debug('trying ' + routePath.regExp);

    var match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    var groupCount = match.length;
    var group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = _namedParamsType.assert(new Map());

      routePath.namedParams.forEach(function (paramName) {
        var _paramNameType = t.string();

        t.param('paramName', _paramNameType).assert(paramName);

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

      route = _routeType.assert(route.defaultRoute);
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

  return _returnType.assert(result);
};

var findMatch$1 = (function (path, routes) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  var _pathType2 = t.string();

  var _routesType2 = t.ref(RoutesType$1);

  var _localeType2 = t.ref(LocaleType$5);

  var _returnType2 = t.return(t.nullable(t.ref(RouteMatchType$1)));

  t.param('path', _pathType2).assert(path);
  t.param('routes', _routesType2).assert(routes);
  t.param('locale', _localeType2).assert(locale);
  return _returnType2.assert(findMatch(path, path, routes, locale));
});

var EndRouteType$2 = t.tdz(function () {
  return EndRouteType;
});
var RoutesType$2 = t.tdz(function () {
  return RoutesType;
});
var RouteMapType$1 = t.tdz(function () {
  return RouteMapType;
});
var RouterType$1 = t.tdz(function () {
  return RouterType;
});
var RouteMatchType$2 = t.tdz(function () {
  return RouteMatchType;
});
var _createRouter = (function (routes, routeMap) {
  var _routesType = t.ref(RoutesType$2);

  var _routeMapType = t.ref(RouteMapType$1);

  var _returnType = t.return(t.ref(RouterType$1));

  t.param('routes', _routesType).assert(routes);
  t.param('routeMap', _routeMapType).assert(routeMap);

  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var _routeKeyType = t.string();

    t.param('routeKey', _routeKeyType).assert(routeKey);

    var route = routeMap.get(routeKey);
    if (!route) throw new Error('No route named "' + routeKey + '"');
    return route;
  };

  return _returnType.assert({
    get: function get(key) {
      var _keyType = t.string();

      var _returnType2 = t.return(t.nullable(t.ref(EndRouteType$2)));

      t.param('key', _keyType).assert(key);
      return _returnType2.assert(getRequiredRoute(key));
    },
    find: function find(path, locale) {
      var _pathType = t.string();

      var _localeType = t.nullable(t.string());

      var _returnType3 = t.return(t.nullable(t.ref(RouteMatchType$2)));

      t.param('path', _pathType).assert(path);
      t.param('locale', _localeType).assert(locale);
      return _returnType3.assert(findMatch$1(path, routes, locale));
    },
    toPath: function toPath(key, args) {
      var _keyType2 = t.string();

      var _argsType = t.any();

      var _returnType4 = t.return(t.string());

      t.param('key', _keyType2).assert(key);
      t.param('args', _argsType).assert(args);
      return _returnType4.assert(getRequiredRoute(key).getPath().toPath(args));
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      var _localeType2 = t.string();

      var _keyType3 = t.string();

      var _argsType2 = t.any();

      var _returnType5 = t.return(t.string());

      t.param('locale', _localeType2).assert(locale);
      t.param('key', _keyType3).assert(key);
      t.param('args', _argsType2).assert(args);
      return _returnType5.assert(getRequiredRoute(key).getPath(locale).toPath(args));
    }
  });
});

var RouteType$3 = t.tdz(function () {
  return RouteType$1;
});
var PathDictionaryType$2 = t.tdz(function () {
  return PathDictionaryType;
});
var RouteRefType$5 = t.tdz(function () {
  return RouteRefType$3;
});
var SegmentRouterBuilderType$1 = t.tdz(function () {
  return SegmentRouterBuilderType;
});
var SegmentRouteType$1 = t.tdz(function () {
  return SegmentRouteType;
});
var AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType$3)), t.return(t.void())));

var createSegmentRouterBuilderCreator = (function (defaultLocale, addToRouteMap) {
  var _defaultLocaleType = t.nullable(t.string());

  t.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);
  t.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var _segmentRouteType = t.ref(SegmentRouteType$1);

    t.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    var getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var _localizedPathsType = t.ref(PathDictionaryType$2);

      var _returnType = t.return(t.ref(PathDictionaryType$2));

      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      var completeLocalizedPaths = {};

      var getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return '' + segmentRoute.path.completePath + path;
      } : function (path, locale) {
        return '' + segmentRoute.localizedPaths.get(locale).completePath + path;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        var _localeType = t.string();

        t.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return _returnType.assert(completeLocalizedPaths);
    };

    var createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      var _pathType = t.string();

      t.param('path', _pathType).assert(path);

      var localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    var _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      var _localizedPathsType2 = t.ref(PathDictionaryType$2);

      var _refType = t.ref(RouteRefType$5);

      var _keyType = t.nullable(t.string());

      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType).assert(key);

      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var finalKey = t.string().assert(key || completeLocalizedPaths[defaultLocale]);
      var route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createEndRoute = function _createEndRoute(path, ref, key) {
      var _pathType2 = t.string();

      var _refType2 = t.ref(RouteRefType$5);

      var _keyType2 = t.nullable(t.string());

      t.param('path', _pathType2).assert(path);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType2).assert(key);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      var completePath = getCompletePath(path);
      var route = createRoute(path, completePath, ref);
      var finalKey = t.string().assert(key || completePath);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      var _localizedPathsType3 = t.ref(PathDictionaryType$2);

      var _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

      t.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    var _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      var _pathType3 = t.string();

      var _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

      t.param('path', _pathType3).assert(path);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

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
        var _refType3 = t.ref(RouteRefType$5);

        var _keyType3 = t.nullable(t.string());

        t.param('ref', _refType3).assert(ref);
        t.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        var _pathType4 = t.string();

        var _refType4 = t.ref(RouteRefType$5);

        var _keyType4 = t.nullable(t.string());

        t.return(t.void());
        t.param('path', _pathType4).assert(path);
        t.param('ref', _refType4).assert(ref);
        t.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        var _localizedPathsType4 = t.ref(PathDictionaryType$2);

        var _refType5 = t.ref(RouteRefType$5);

        var _keyType5 = t.nullable(t.string());

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);
        t.param('ref', _refType5).assert(ref);
        t.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: function addSegment(path, buildSegment) {
        var _pathType5 = t.string();

        var _buildSegmentType3 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

        t.return(t.void());
        t.param('path', _pathType5).assert(path);
        t.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        var _localizedPathsType5 = t.ref(PathDictionaryType$2);

        var _buildSegmentType4 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$1)), t.return(t.void()));

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType5).assert(localizedPaths);
        t.param('buildSegment', _buildSegmentType4).assert(buildSegment);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };
  return createSegmentRouterBuilder;
});

var LocaleType$6 = t.tdz(function () {
  return LocaleType$3;
});
var RouterBuilderType$1 = t.tdz(function () {
  return RouterBuilderType;
});
var PathDictionaryType$3 = t.tdz(function () {
  return PathDictionaryType;
});
var RoutesType$3 = t.tdz(function () {
  return RoutesType;
});
var RouteMapType$2 = t.tdz(function () {
  return RouteMapType;
});
var RouteType$4 = t.tdz(function () {
  return RouteType$1;
});
var SegmentRouterBuilderType$2 = t.tdz(function () {
  return SegmentRouterBuilderType;
});
var RouteRefType$6 = t.tdz(function () {
  return RouteRefType$3;
});
var createRouterBuilder = (function (locales) {
  var _localesType = t.nullable(t.array(t.ref(LocaleType$6)));

  var _returnType = t.return(t.ref(RouterBuilderType$1));

  t.param('locales', _localesType).assert(locales);

  var defaultLocale = locales && locales[0];
  var routes = t.ref(RoutesType$3).assert([]);
  var routeMap = t.ref(RouteMapType$2).assert(new Map());

  var addToRouteMap = function addToRouteMap(key, route) {
    var _keyType = t.string();

    var _routeType = t.ref(RouteType$4);

    t.param('key', _keyType).assert(key);
    t.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error('"' + key + '" is already used');
    routeMap.set(key, route);
  };

  var createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: function add(path, ref, key) {
      var _pathType = t.string();

      var _refType = t.ref(RouteRefType$6);

      var _keyType2 = t.nullable(t.string());

      t.return(t.void());
      t.param('path', _pathType).assert(path);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType2).assert(key);

      var route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      var _localizedPathsType = t.ref(PathDictionaryType$3);

      var _refType2 = t.ref(RouteRefType$6);

      var _keyType3 = t.nullable(t.string());

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      var route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      var finalKey = t.string().assert(key || localizedPaths[defaultLocale]);
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      var _pathType2 = t.string();

      var _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$2)), t.return(t.void()));

      t.return(t.void());
      t.param('path', _pathType2).assert(path);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      var route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      var _localizedPathsType2 = t.ref(PathDictionaryType$3);

      var _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType$2)), t.return(t.void()));

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

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
  });
});

export default createRouterBuilder;
//# sourceMappingURL=index-browser-dev.es.js.map

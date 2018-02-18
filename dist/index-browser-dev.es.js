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

var _dec, _dec2, _class, _descriptor, _descriptor2;

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
var RoutePathType$1 = t.tdz(function () {
  return RoutePathType;
});
var RouteRefType$1 = t.tdz(function () {
  return RouteRefType;
});
var EndRoute = (_dec = t.decorate(t.ref(RoutePathType$1)), _dec2 = t.decorate(t.ref(RouteRefType$1)), _class = function () {
  function EndRoute(path, ref) {
    classCallCheck(this, EndRoute);

    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

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
}(), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'path', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'ref', [_dec2], {
  enumerable: true,
  initializer: null
}), _class);

var _dec$1, _dec2$1, _class$1, _descriptor$1, _descriptor2$1;

function _initDefineProp$1(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
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
var LocaleType$1 = t.tdz(function () {
  return LocaleType;
});
var RoutePathType$2 = t.tdz(function () {
  return RoutePathType;
});
var RouteRefType$2 = t.tdz(function () {
  return RouteRefType;
});
var LocalizedEndRoute = (_dec$1 = t.decorate(t.ref('Map', t.ref(LocaleType$1), t.ref(RoutePathType$2))), _dec2$1 = t.decorate(t.ref(RouteRefType$2)), _class$1 = function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    classCallCheck(this, LocalizedEndRoute);

    _initDefineProp$1(this, 'localizedPaths', _descriptor$1, this);

    _initDefineProp$1(this, 'ref', _descriptor2$1, this);

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
}(), _descriptor$1 = _applyDecoratedDescriptor$1(_class$1.prototype, 'localizedPaths', [_dec$1], {
  enumerable: true,
  initializer: null
}), _descriptor2$1 = _applyDecoratedDescriptor$1(_class$1.prototype, 'ref', [_dec2$1], {
  enumerable: true,
  initializer: null
}), _class$1);

var _dec$2, _dec2$2, _class$2, _descriptor$2, _descriptor2$2;

function _initDefineProp$2(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
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
var Route = t.tdz(function () {
  return EndRoute;
});
var SegmentRoutePathType$1 = t.tdz(function () {
  return SegmentRoutePathType;
});
var SegmentRoute = (_dec$2 = t.decorate(t.ref(SegmentRoutePathType$1)), _dec2$2 = t.decorate(t.nullable(t.ref(Route))), _class$2 = function () {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  function SegmentRoute(path) {
    classCallCheck(this, SegmentRoute);

    _initDefineProp$2(this, 'path', _descriptor$2, this);

    this.nestedRoutes = [];

    _initDefineProp$2(this, 'defaultRoute', _descriptor2$2, this);

    var _pathType = t.ref(SegmentRoutePathType$1);

    t.param('path', _pathType).assert(path);

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
}(), _descriptor$2 = _applyDecoratedDescriptor$2(_class$2.prototype, 'path', [_dec$2], {
  enumerable: true,
  initializer: null
}), _descriptor2$2 = _applyDecoratedDescriptor$2(_class$2.prototype, 'defaultRoute', [_dec2$2], {
  enumerable: true,
  initializer: null
}), _class$2);

var _dec$3, _dec2$3, _dec3, _class$3, _descriptor$3, _descriptor2$3, _descriptor3;

function _initDefineProp$3(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
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
var LocalizedSegmentRoute = (_dec$3 = t.decorate(t.ref('Map', t.ref(LocaleType$2), t.ref(SegmentRoutePathType$2))), _dec2$3 = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _dec3 = t.decorate(t.nullable(t.ref(LocalizedRoute))), _class$3 = function () {
  function LocalizedSegmentRoute(localizedPaths) {
    classCallCheck(this, LocalizedSegmentRoute);

    _initDefineProp$3(this, 'localizedPaths', _descriptor$3, this);

    _initDefineProp$3(this, 'nestedRoutes', _descriptor2$3, this);

    _initDefineProp$3(this, 'defaultRoute', _descriptor3, this);

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
}(), _descriptor$3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'localizedPaths', [_dec$3], {
  enumerable: true,
  initializer: null
}), _descriptor2$3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'nestedRoutes', [_dec2$3], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'defaultRoute', [_dec3], {
  enumerable: true,
  initializer: null
}), _class$3);

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
  return t.exactObject(t.property('defaultRoute', t.function(t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))));
});

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

var RoutesType = t.type('RoutesType', t.array(t.ref(RouteType$1)));
var RouteMapType = t.type('RouteMapType', t.ref('Map', t.string(), t.ref(RouteType$1)));

var RouteMatchType = t.type('RouteMatchType', t.exactObject(t.property('ref', t.ref(RouteRefType$3)), t.property('path', t.string()), t.property('route', t.ref(RouteType$1)), t.property('routePath', t.union(t.ref(SegmentRoutePathType$3), t.ref(RoutePathType$3))), t.property('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.property('otherParams', t.nullable(t.array(t.string())))));

var RouterType = t.type('RouterType', t.exactObject(t.property('get', t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType$1))))), t.property('find', t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string())), t.return(t.nullable(RouteMatchType)))), t.property('toPath', t.function(t.param('key', t.string()), t.param('args', t.any()), t.return(t.string()))), t.property('toLocalizedPath', t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any()), t.return(t.string())))));

var RouterBuilderType = t.type('RouterBuilderType', t.exactObject(t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('getRoutes', t.function(t.return(RoutesType))), t.property('createRouter', t.function(t.return(RouterType)))));

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
  var regExp = pathToRegExp(segment ? path + '/(.+)?' : path, keys, {
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

export default createRouterBuilder;
//# sourceMappingURL=index-browser-dev.es.js.map

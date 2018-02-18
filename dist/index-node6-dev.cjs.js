'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var t = _interopDefault(require('flow-runtime'));
var pathToRegExp = _interopDefault(require('path-to-regexp'));
var Logger = _interopDefault(require('nightingale-logger'));

const RouteRefType = t.type("RouteRefType", t.any());

const RoutePathType = t.type("RoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string())), t.property("toPath", t.function(t.param("args", t.object()), t.return(t.string())))));

const SegmentRoutePathType = t.type("SegmentRoutePathType", t.exactObject(t.property("path", t.string()), t.property("completePath", t.string()), t.property("regExp", t.ref("RegExp")), t.property("namedParams", t.array(t.string()))));

const LocaleType = t.type("LocaleType", t.string());

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
const RoutePathType$1 = t.tdz(() => RoutePathType);
const RouteRefType$1 = t.tdz(() => RouteRefType);
let EndRoute = (_dec = t.decorate(t.ref(RoutePathType$1)), _dec2 = t.decorate(t.ref(RouteRefType$1)), _class = class {

  constructor(path, ref) {
    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    let _pathType = t.ref(RoutePathType$1);

    let _refType = t.ref(RouteRefType$1);

    t.param('path', _pathType).assert(path);
    t.param('ref', _refType).assert(ref);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath() {
    const _returnType = t.return(t.ref(RoutePathType$1));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(false);
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, 'path', [_dec], {
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
const LocaleType$1 = t.tdz(() => LocaleType);
const RoutePathType$2 = t.tdz(() => RoutePathType);
const RouteRefType$2 = t.tdz(() => RouteRefType);
let LocalizedEndRoute = (_dec$1 = t.decorate(t.ref('Map', t.ref(LocaleType$1), t.ref(RoutePathType$2))), _dec2$1 = t.decorate(t.ref(RouteRefType$2)), _class$1 = class {

  constructor(localizedPaths, ref) {
    _initDefineProp$1(this, 'localizedPaths', _descriptor$1, this);

    _initDefineProp$1(this, 'ref', _descriptor2$1, this);

    let _localizedPathsType = t.ref('Map', t.ref(LocaleType$1), t.ref(RoutePathType$2));

    let _refType = t.ref(RouteRefType$2);

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
    t.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType$1);

    const _returnType = t.return(t.nullable(t.ref(RoutePathType$2)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(false);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, _descriptor$1 = _applyDecoratedDescriptor$1(_class$1.prototype, 'localizedPaths', [_dec$1], {
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
const Route = t.tdz(() => EndRoute);
const SegmentRoutePathType$1 = t.tdz(() => SegmentRoutePathType);
let SegmentRoute = (_dec$2 = t.decorate(t.ref(SegmentRoutePathType$1)), _dec2$2 = t.decorate(t.nullable(t.ref(Route))), _class$2 = class {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  constructor(path) {
    _initDefineProp$2(this, 'path', _descriptor$2, this);

    this.nestedRoutes = [];

    _initDefineProp$2(this, 'defaultRoute', _descriptor2$2, this);

    let _pathType = t.ref(SegmentRoutePathType$1);

    t.param('path', _pathType).assert(path);

    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    const _returnType = t.return(t.ref(SegmentRoutePathType$1));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, _descriptor$2 = _applyDecoratedDescriptor$2(_class$2.prototype, 'path', [_dec$2], {
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
const LocalizedRoute = t.tdz(() => LocalizedEndRoute);
const LocaleType$2 = t.tdz(() => LocaleType);
const SegmentRoutePathType$2 = t.tdz(() => SegmentRoutePathType);
let LocalizedSegmentRoute = (_dec$3 = t.decorate(t.ref('Map', t.ref(LocaleType$2), t.ref(SegmentRoutePathType$2))), _dec2$3 = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _dec3 = t.decorate(t.nullable(t.ref(LocalizedRoute))), _class$3 = class {

  constructor(localizedPaths) {
    _initDefineProp$3(this, 'localizedPaths', _descriptor$3, this);

    _initDefineProp$3(this, 'nestedRoutes', _descriptor2$3, this);

    _initDefineProp$3(this, 'defaultRoute', _descriptor3, this);

    let _localizedPathsType = t.ref('Map', t.ref(LocaleType$2), t.ref(SegmentRoutePathType$2));

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType$2);

    const _returnType = t.return(t.nullable(t.ref(SegmentRoutePathType$2)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, _descriptor$3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'localizedPaths', [_dec$3], {
  enumerable: true,
  initializer: null
}), _descriptor2$3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'nestedRoutes', [_dec2$3], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor$3(_class$3.prototype, 'defaultRoute', [_dec3], {
  enumerable: true,
  initializer: null
}), _class$3);

const RouteType = t.type('RouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute), t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
const SegmentRouteType = t.type('SegmentRouteType', t.union(t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
const EndRouteType = t.type('EndRouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute)));

const RouteRefType$3 = t.tdz(() => RouteRefType);
const RoutePathType$3 = t.tdz(() => RoutePathType);
const SegmentRoutePathType$3 = t.tdz(() => SegmentRoutePathType);
const LocaleType$3 = t.tdz(() => LocaleType);
const RouteType$1 = t.tdz(() => RouteType);
const EndRouteType$1 = t.tdz(() => EndRouteType);

const PathDictionaryType = t.type('PathDictionaryType', t.object(t.indexer('key', t.ref(LocaleType$3), t.string())));

const SegmentRouterBuilderType = t.type('SegmentRouterBuilderType', SegmentRouterBuilderType => {
  return t.exactObject(t.property('defaultRoute', t.function(t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))));
});

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

const RoutesType = t.type('RoutesType', t.array(t.ref(RouteType$1)));
const RouteMapType = t.type('RouteMapType', t.ref('Map', t.string(), t.ref(RouteType$1)));

const RouteMatchType = t.type('RouteMatchType', t.exactObject(t.property('ref', t.ref(RouteRefType$3)), t.property('path', t.string()), t.property('route', t.ref(RouteType$1)), t.property('routePath', t.union(t.ref(SegmentRoutePathType$3), t.ref(RoutePathType$3))), t.property('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.property('otherParams', t.nullable(t.array(t.string())))));

const RouterType = t.type('RouterType', t.exactObject(t.property('get', t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType$1))))), t.property('find', t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string())), t.return(t.nullable(RouteMatchType)))), t.property('toPath', t.function(t.param('key', t.string()), t.param('args', t.any()), t.return(t.string()))), t.property('toLocalizedPath', t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any()), t.return(t.string())))));

const RouterBuilderType = t.type('RouterBuilderType', t.exactObject(t.property('add', t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', t.ref(RouteRefType$3)), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('getRoutes', t.function(t.return(RoutesType))), t.property('createRouter', t.function(t.return(RouterType)))));

const SegmentRoutePathType$4 = t.tdz(() => SegmentRoutePathType$3);
const RoutePathType$4 = t.tdz(() => RoutePathType$3);
const internalCreateRoutePath = (path, completePath, segment) => {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _segmentType = t.boolean();

  const _returnType = t.return(t.union(t.ref(SegmentRoutePathType$4), t.ref(RoutePathType$4)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('segment', _segmentType).assert(segment);

  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);

  if (segment) return _returnType.assert({ path, completePath, regExp, namedParams });

  return _returnType.assert({
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath)
  });
};

const createRoutePathSegment = (path, completePath) => {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType2 = t.return(t.ref(SegmentRoutePathType$4));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);
  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
};

const createRoutePath = (path, completePath) => {
  let _pathType3 = t.string();

  let _completePathType3 = t.string();

  const _returnType3 = t.return(t.ref(RoutePathType$4));

  t.param('path', _pathType3).assert(path);
  t.param('completePath', _completePathType3).assert(completePath);
  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
};

const LocaleType$4 = t.tdz(() => LocaleType$3);
const PathDictionaryType$1 = t.tdz(() => PathDictionaryType);
const RoutePathType$5 = t.tdz(() => RoutePathType$3);
const SegmentRoutePathType$5 = t.tdz(() => SegmentRoutePathType$3);
const RouteRefType$4 = t.tdz(() => RouteRefType$3);
const createLocalizedPaths = (pathDictionary, completePathDictionary, segment) => {
  let _pathDictionaryType = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType = t.ref(PathDictionaryType$1);

  let _segmentType = t.boolean();

  t.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);
  t.param('segment', _segmentType).assert(segment);

  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(locale => {
    let _localeType = t.ref(LocaleType$4);

    t.param('locale', _localeType).assert(locale);

    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = t.ref(SegmentRoutePathType$5).assert(createRoutePathSegment(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = ref => {
  let _refType = t.any();

  t.param('ref', _refType).assert(ref);

  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

const createRoute = (path, completePath, ref) => {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _refType2 = t.ref(RouteRefType$4);

  const _returnType = t.return(t.ref(EndRoute));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const routePath = t.ref(RoutePathType$5).assert(createRoutePath(path, completePath));
  return _returnType.assert(new EndRoute(routePath, ref));
};

const createLocalizedRoute = (pathDictionary, completePathDictionary, ref) => {
  let _pathDictionaryType2 = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType2 = t.ref(PathDictionaryType$1);

  let _refType3 = t.ref(RouteRefType$4);

  const _returnType2 = t.return(t.ref(LocalizedEndRoute));

  t.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);
  t.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new LocalizedEndRoute(localizedPaths, ref));
};

const createSegmentRoute = (path, completePath) => {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType3 = t.return(t.ref(SegmentRoute));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);

  const routePath = createRoutePathSegment(path, completePath);
  return _returnType3.assert(new SegmentRoute(routePath));
};

const createLocalizedSegmentRoute = (pathDictionary, completePathDictionary) => {
  let _pathDictionaryType3 = t.ref(PathDictionaryType$1);

  let _completePathDictionaryType3 = t.ref(PathDictionaryType$1);

  const _returnType4 = t.return(t.ref(LocalizedSegmentRoute));

  t.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new LocalizedSegmentRoute(localizedPaths));
};

const RouteType$2 = t.tdz(() => RouteType);
const RoutesType$1 = t.tdz(() => RoutesType);
const LocaleType$5 = t.tdz(() => LocaleType$3);
const RouteMatchType$1 = t.tdz(() => RouteMatchType);
const SegmentRoutePathType$6 = t.tdz(() => SegmentRoutePathType$3);
const RoutePathType$6 = t.tdz(() => RoutePathType$3);
const logger = new Logger('router-segments:findMatch');

const parseOtherParams = wildcard => {
  let _wildcardType = t.string();

  t.param('wildcard', _wildcardType).assert(wildcard);
  return wildcard ? wildcard.split('/') : [];
};

const findMatch = (path, completePath, routes, locale, namedParams) => {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _routesType = t.ref(RoutesType$1);

  let _localeType = t.ref(LocaleType$5);

  let _namedParamsType = t.nullable(t.ref('Map', t.string(), t.string()));

  const _returnType = t.return(t.nullable(t.ref(RouteMatchType$1)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('routes', _routesType).assert(routes);
  t.param('locale', _localeType).assert(locale);
  t.param('namedParams', _namedParamsType).assert(namedParams);

  let result = null;

  routes.some(route => {
    let _routeType = t.ref(RouteType$2);

    t.param('route', _routeType).assert(route);

    const routePath = t.union(t.nullable(t.ref(SegmentRoutePathType$6)), t.ref(RoutePathType$6)).assert(route.getPath(locale));

    if (!routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    logger.debug(`trying ${routePath.regExp}`);

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = _namedParamsType.assert(new Map());

      routePath.namedParams.forEach(paramName => {
        let _paramNameType = t.string();

        t.param('paramName', _paramNameType).assert(paramName);

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

      route = _routeType.assert(route.defaultRoute);
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

  return _returnType.assert(result);
};

const EndRouteType$2 = t.tdz(() => EndRouteType);
const RoutesType$2 = t.tdz(() => RoutesType);
const RouteMapType$1 = t.tdz(() => RouteMapType);
const RouterType$1 = t.tdz(() => RouterType);
const RouteMatchType$2 = t.tdz(() => RouteMatchType);

const RouteType$3 = t.tdz(() => RouteType$1);
const PathDictionaryType$2 = t.tdz(() => PathDictionaryType);
const RouteRefType$5 = t.tdz(() => RouteRefType$3);
const SegmentRouterBuilderType$1 = t.tdz(() => SegmentRouterBuilderType);
const SegmentRouteType$1 = t.tdz(() => SegmentRouteType);
const AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType$3)), t.return(t.void())));

const LocaleType$6 = t.tdz(() => LocaleType$3);
const RouterBuilderType$1 = t.tdz(() => RouterBuilderType);
const PathDictionaryType$3 = t.tdz(() => PathDictionaryType);
const RoutesType$3 = t.tdz(() => RoutesType);
const RouteMapType$2 = t.tdz(() => RouteMapType);
const RouteType$4 = t.tdz(() => RouteType$1);
const SegmentRouterBuilderType$2 = t.tdz(() => SegmentRouterBuilderType);
const RouteRefType$6 = t.tdz(() => RouteRefType$3);

module.exports = createRouterBuilder;
//# sourceMappingURL=index-node6-dev.cjs.js.map

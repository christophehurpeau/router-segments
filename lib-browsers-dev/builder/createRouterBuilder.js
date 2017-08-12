'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var _create = require('../routes/create');

var _createRouter2 = require('../router/createRouter');

var _createRouter3 = _interopRequireDefault(_createRouter2);

var _createSegmentRouterBuilderCreator = require('./createSegmentRouterBuilderCreator');

var _createSegmentRouterBuilderCreator2 = _interopRequireDefault(_createSegmentRouterBuilderCreator);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalesType = _flowRuntime2.default.tdz(function () {
  return _types.LocalesType;
});

var RouterBuilderType = _flowRuntime2.default.tdz(function () {
  return _types.RouterBuilderType;
});

var PathDictionaryType = _flowRuntime2.default.tdz(function () {
  return _types.PathDictionaryType;
});

var RoutesType = _flowRuntime2.default.tdz(function () {
  return _types.RoutesType;
});

var RouteMapType = _flowRuntime2.default.tdz(function () {
  return _types.RouteMapType;
});

var RouteType = _flowRuntime2.default.tdz(function () {
  return _types.RouteType;
});

var SegmentRouterBuilderType = _flowRuntime2.default.tdz(function () {
  return _types.SegmentRouterBuilderType;
});

var RouteRefType = _flowRuntime2.default.tdz(function () {
  return _types.RouteRefType;
});

exports.default = function createRouterBuilder(locales) {
  var _localesType = _flowRuntime2.default.nullable(_flowRuntime2.default.ref(LocalesType));

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RouterBuilderType));

  _flowRuntime2.default.param('locales', _localesType).assert(locales);

  var defaultLocale = locales && locales[0];
  var routes = _flowRuntime2.default.ref(RoutesType).assert([]);
  var routeMap = _flowRuntime2.default.ref(RouteMapType).assert(new Map());

  var addToRouteMap = function addToRouteMap(key, route) {
    var _keyType = _flowRuntime2.default.string();

    var _routeType = _flowRuntime2.default.ref(RouteType);

    _flowRuntime2.default.param('key', _keyType).assert(key);

    _flowRuntime2.default.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error('"' + key + '" is already used');
    routeMap.set(key, route);
  };

  var createSegmentRouterBuilder = (0, _createSegmentRouterBuilderCreator2.default)(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: function add(path, ref, key) {
      var _pathType = _flowRuntime2.default.string();

      var _refType = _flowRuntime2.default.ref(RouteRefType);

      var _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('path', _pathType).assert(path);

      _flowRuntime2.default.param('ref', _refType).assert(ref);

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      var route = (0, _create.createRoute)(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      var _localizedPathsType = _flowRuntime2.default.ref(PathDictionaryType);

      var _refType2 = _flowRuntime2.default.ref(RouteRefType);

      var _keyType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      _flowRuntime2.default.param('ref', _refType2).assert(ref);

      _flowRuntime2.default.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      var route = (0, _create.createLocalizedRoute)(localizedPaths, localizedPaths, ref);
      routes.push(route);
      var finalKey = _flowRuntime2.default.string().assert(key || localizedPaths[defaultLocale]);
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      var _pathType2 = _flowRuntime2.default.string();

      var _buildSegmentType = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('path', _pathType2).assert(path);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType).assert(buildSegment);

      var route = (0, _create.createSegmentRoute)(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      var _localizedPathsType2 = _flowRuntime2.default.ref(PathDictionaryType);

      var _buildSegmentType2 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (!defaultLocale) throw new Error('Invalid locales');
      var route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter() {
      return (0, _createRouter3.default)(routes, routeMap);
    }
  });
};
//# sourceMappingURL=createRouterBuilder.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var _create = require('../routes/create');

var _createRouter = require('../router/createRouter');

var _createRouter2 = _interopRequireDefault(_createRouter);

var _createSegmentRouterBuilderCreator = require('./createSegmentRouterBuilderCreator');

var _createSegmentRouterBuilderCreator2 = _interopRequireDefault(_createSegmentRouterBuilderCreator);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalesType = _flowRuntime2.default.tdz(() => _types.LocalesType);

const RouterBuilderType = _flowRuntime2.default.tdz(() => _types.RouterBuilderType);

const PathDictionaryType = _flowRuntime2.default.tdz(() => _types.PathDictionaryType);

const RoutesType = _flowRuntime2.default.tdz(() => _types.RoutesType);

const RouteMapType = _flowRuntime2.default.tdz(() => _types.RouteMapType);

const RouteType = _flowRuntime2.default.tdz(() => _types.RouteType);

const SegmentRouterBuilderType = _flowRuntime2.default.tdz(() => _types.SegmentRouterBuilderType);

const RouteRefType = _flowRuntime2.default.tdz(() => _types.RouteRefType);

exports.default = _flowRuntime2.default.annotate(locales => {
  let _localesType = _flowRuntime2.default.nullable(_flowRuntime2.default.ref(LocalesType));

  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RouterBuilderType));

  _flowRuntime2.default.param('locales', _localesType).assert(locales);

  const defaultLocale = locales && locales[0];
  const routes = _flowRuntime2.default.ref(RoutesType).assert([]);
  const routeMap = _flowRuntime2.default.ref(RouteMapType).assert(new Map());

  const addToRouteMap = _flowRuntime2.default.annotate(function addToRouteMap(key, route) {
    let _keyType = _flowRuntime2.default.string();

    let _routeType = _flowRuntime2.default.ref(RouteType);

    _flowRuntime2.default.param('key', _keyType).assert(key);

    _flowRuntime2.default.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  }, _flowRuntime2.default.function(_flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('route', _flowRuntime2.default.ref(RouteType))));

  const createSegmentRouterBuilder = (0, _createSegmentRouterBuilderCreator2.default)(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: _flowRuntime2.default.annotate((path, ref, key) => {
      let _pathType = _flowRuntime2.default.string();

      let _refType = _flowRuntime2.default.ref(RouteRefType);

      let _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('path', _pathType).assert(path);

      _flowRuntime2.default.param('ref', _refType).assert(ref);

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      const route = (0, _create.createRoute)(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

    addLocalized: _flowRuntime2.default.annotate((localizedPaths, ref, key) => {
      let _localizedPathsType = _flowRuntime2.default.ref(PathDictionaryType);

      let _refType2 = _flowRuntime2.default.ref(RouteRefType);

      let _keyType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      _flowRuntime2.default.param('ref', _refType2).assert(ref);

      _flowRuntime2.default.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = (0, _create.createLocalizedRoute)(localizedPath, localizedPath, ref);
      routes.push(route);
      const finalKey = _flowRuntime2.default.string().assert(key || localizedPath[defaultLocale]);
      addToRouteMap(finalKey, route);
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

    addSegment: _flowRuntime2.default.annotate((path, buildSegment) => {
      let _pathType2 = _flowRuntime2.default.string();

      let _buildSegmentType = _flowRuntime2.default.ref(SegmentRouterBuilderType);

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('path', _pathType2).assert(path);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const route = (0, _create.createSegmentRoute)(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

    addLocalizedSegment: _flowRuntime2.default.annotate((localizedPaths, buildSegment) => {
      let _localizedPathsType2 = _flowRuntime2.default.ref(PathDictionaryType);

      let _buildSegmentType2 = _flowRuntime2.default.ref(SegmentRouterBuilderType);

      _flowRuntime2.default.return(_flowRuntime2.default.void());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

    getRoutes: () => routes,
    createRouter: () => (0, _createRouter2.default)(routes, routeMap)
  });
}, _flowRuntime2.default.function(_flowRuntime2.default.param('locales', _flowRuntime2.default.nullable(_flowRuntime2.default.ref(LocalesType))), _flowRuntime2.default.return(_flowRuntime2.default.ref(RouterBuilderType))));
//# sourceMappingURL=createRouterBuilder.js.map
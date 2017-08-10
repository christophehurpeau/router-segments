'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../routes/index');

var _types = require('../types');

var _create = require('../routes/create');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteType = _flowRuntime2.default.tdz(() => _types.RouteType);

const PathDictionaryType = _flowRuntime2.default.tdz(() => _types.PathDictionaryType);

const SegmentCallbackType = _flowRuntime2.default.tdz(() => _types.SegmentCallbackType);

const RouteRefType = _flowRuntime2.default.tdz(() => _types.RouteRefType);

const SegmentRouteType = _flowRuntime2.default.tdz(() => _index.SegmentRouteType);

const AddToRouteMapType = _flowRuntime2.default.type('AddToRouteMapType', _flowRuntime2.default.function(_flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('route', _flowRuntime2.default.ref(RouteType)), _flowRuntime2.default.return(_flowRuntime2.default.void())));

exports.default = _flowRuntime2.default.annotate((defaultLocale, addToRouteMap) => {
  let _defaultLocaleType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  _flowRuntime2.default.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);

  _flowRuntime2.default.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  const createSegmentRouterBuilder = _flowRuntime2.default.annotate(function createSegmentRouterBuilder(segmentRoute) {
    let _segmentRouteType = _flowRuntime2.default.ref(SegmentRouteType);

    _flowRuntime2.default.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    const getCompletePath = path => segmentRoute.path.completePath + path;
    const getCompleteLocalizedPaths = _flowRuntime2.default.annotate(function getCompleteLocalizedPaths(localizedPaths) {
      let _localizedPathsType = _flowRuntime2.default.ref(PathDictionaryType);

      const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(PathDictionaryType));

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? path => `${segmentRoute.path.completePath}${path}` : (path, locale) => `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;

      Object.keys(localizedPaths).forEach(_flowRuntime2.default.annotate(locale => {
        let _localeType = _flowRuntime2.default.string();

        _flowRuntime2.default.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('locale', _flowRuntime2.default.string()))));

      return _returnType.assert(completeLocalizedPaths);
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.return(_flowRuntime2.default.ref(PathDictionaryType))));

    const createLocalizedPathFromSegment = _flowRuntime2.default.annotate(function createLocalizedPathFromSegment(path) {
      let _pathType = _flowRuntime2.default.string();

      _flowRuntime2.default.param('path', _pathType).assert(path);

      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(locale => localizedPaths[locale] = path);
      return localizedPaths;
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string())));

    const _createLocalizedEndRoute = _flowRuntime2.default.annotate(function _createLocalizedEndRoute(localizedPaths, ref, key) {
      let _localizedPathsType2 = _flowRuntime2.default.ref(PathDictionaryType);

      let _refType = _flowRuntime2.default.ref(RouteRefType);

      let _keyType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);

      _flowRuntime2.default.param('ref', _refType).assert(ref);

      _flowRuntime2.default.param('key', _keyType).assert(key);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = _flowRuntime2.default.string().assert(key || completeLocalizedPaths[defaultLocale]);
      const route = (0, _create.createLocalizedRoute)(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

    const _createEndRoute = _flowRuntime2.default.annotate(function _createEndRoute(path, ref, key) {
      let _pathType2 = _flowRuntime2.default.string();

      let _refType2 = _flowRuntime2.default.ref(RouteRefType);

      let _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.param('path', _pathType2).assert(path);

      _flowRuntime2.default.param('ref', _refType2).assert(ref);

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = (0, _create.createRoute)(path, completePath, ref);
      const finalKey = _flowRuntime2.default.string().assert(key || completePath);
      addToRouteMap(finalKey, route);
      return route;
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

    const _createLocalizedSegmentRoute = _flowRuntime2.default.annotate(function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      let _localizedPathsType3 = _flowRuntime2.default.ref(PathDictionaryType);

      let _buildSegmentType = _flowRuntime2.default.ref(SegmentCallbackType);

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentCallbackType))));

    const _createSegmentRoute = _flowRuntime2.default.annotate(function _createSegmentRoute(path, buildSegment) {
      let _pathType3 = _flowRuntime2.default.string();

      let _buildSegmentType2 = _flowRuntime2.default.ref(SegmentCallbackType);

      _flowRuntime2.default.param('path', _pathType3).assert(path);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      const completePath = getCompletePath(path);
      const route = (0, _create.createSegmentRoute)(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentCallbackType))));

    return {
      defaultRoute: _flowRuntime2.default.annotate((ref, key) => {
        let _refType3 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.param('ref', _refType3).assert(ref);

        _flowRuntime2.default.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())))),

      add: _flowRuntime2.default.annotate((path, ref, key) => {
        let _pathType4 = _flowRuntime2.default.string();

        let _refType4 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType4).assert(path);

        _flowRuntime2.default.param('ref', _refType4).assert(ref);

        _flowRuntime2.default.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

      addLocalized: _flowRuntime2.default.annotate((localizedPaths, ref, key) => {
        let _localizedPathsType4 = _flowRuntime2.default.ref(PathDictionaryType);

        let _refType5 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);

        _flowRuntime2.default.param('ref', _refType5).assert(ref);

        _flowRuntime2.default.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

      addSegment: _flowRuntime2.default.annotate((path, buildSegment) => {
        let _pathType5 = _flowRuntime2.default.string();

        let _buildSegmentType3 = _flowRuntime2.default.ref(SegmentCallbackType);

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType5).assert(path);

        _flowRuntime2.default.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentCallbackType)), _flowRuntime2.default.return(_flowRuntime2.default.void()))),

      addLocalizedSegment: _flowRuntime2.default.annotate((localizedPaths, buildSegment) => {
        let _localizedPathsType5 = _flowRuntime2.default.ref(PathDictionaryType);

        let _buildSegmentType4 = _flowRuntime2.default.ref(SegmentCallbackType);

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('localizedPaths', _localizedPathsType5).assert(localizedPaths);

        _flowRuntime2.default.param('buildSegment', _buildSegmentType4).assert(buildSegment);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPaths', _flowRuntime2.default.ref(PathDictionaryType)), _flowRuntime2.default.param('buildSegment', _flowRuntime2.default.ref(SegmentCallbackType)), _flowRuntime2.default.return(_flowRuntime2.default.void())))
    };
  }, _flowRuntime2.default.function(_flowRuntime2.default.param('segmentRoute', _flowRuntime2.default.ref(SegmentRouteType))));
  return createSegmentRouterBuilder;
}, _flowRuntime2.default.function(_flowRuntime2.default.param('defaultLocale', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.param('addToRouteMap', AddToRouteMapType)));
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
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

const RouteRefType = _flowRuntime2.default.tdz(() => _types.RouteRefType);

const SegmentRouterBuilderType = _flowRuntime2.default.tdz(() => _types.SegmentRouterBuilderType);

const SegmentRouteType = _flowRuntime2.default.tdz(() => _index.SegmentRouteType);

const AddToRouteMapType = _flowRuntime2.default.type('AddToRouteMapType', _flowRuntime2.default.function(_flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('route', _flowRuntime2.default.ref(RouteType)), _flowRuntime2.default.return(_flowRuntime2.default.void())));

exports.default = function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  let _defaultLocaleType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  _flowRuntime2.default.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);

  _flowRuntime2.default.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  const createSegmentRouterBuilder = segmentRoute => {
    let _segmentRouteType = _flowRuntime2.default.ref(SegmentRouteType);

    _flowRuntime2.default.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    const getCompletePath = path => segmentRoute.path.completePath + path;
    const getCompleteLocalizedPaths = localizedPaths => {
      let _localizedPathsType = _flowRuntime2.default.ref(PathDictionaryType);

      const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(PathDictionaryType));

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? path => `${segmentRoute.path.completePath}${path}` : (path, locale) => `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;

      Object.keys(localizedPaths).forEach(locale => {
        let _localeType = _flowRuntime2.default.string();

        _flowRuntime2.default.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return _returnType.assert(completeLocalizedPaths);
    };

    const createLocalizedPathFromSegment = path => {
      let _pathType = _flowRuntime2.default.string();

      _flowRuntime2.default.param('path', _pathType).assert(path);

      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(locale => localizedPaths[locale] = path);
      return localizedPaths;
    };

    const _createLocalizedEndRoute = (localizedPaths, ref, key) => {
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
    };

    const _createEndRoute = (path, ref, key) => {
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
    };

    const _createLocalizedSegmentRoute = (localizedPaths, buildSegment) => {
      let _localizedPathsType3 = _flowRuntime2.default.ref(PathDictionaryType);

      let _buildSegmentType = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (path, buildSegment) => {
      let _pathType3 = _flowRuntime2.default.string();

      let _buildSegmentType2 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

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
    };

    return {
      defaultRoute: (ref, key) => {
        let _refType3 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.param('ref', _refType3).assert(ref);

        _flowRuntime2.default.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: (path, ref, key) => {
        let _pathType4 = _flowRuntime2.default.string();

        let _refType4 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType4).assert(path);

        _flowRuntime2.default.param('ref', _refType4).assert(ref);

        _flowRuntime2.default.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: (localizedPaths, ref, key) => {
        let _localizedPathsType4 = _flowRuntime2.default.ref(PathDictionaryType);

        let _refType5 = _flowRuntime2.default.ref(RouteRefType);

        let _keyType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);

        _flowRuntime2.default.param('ref', _refType5).assert(ref);

        _flowRuntime2.default.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: (path, buildSegment) => {
        let _pathType5 = _flowRuntime2.default.string();

        let _buildSegmentType3 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType5).assert(path);

        _flowRuntime2.default.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: (localizedPaths, buildSegment) => {
        let _localizedPathsType5 = _flowRuntime2.default.ref(PathDictionaryType);

        let _buildSegmentType4 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('localizedPaths', _localizedPathsType5).assert(localizedPaths);

        _flowRuntime2.default.param('buildSegment', _buildSegmentType4).assert(buildSegment);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };
  return createSegmentRouterBuilder;
};
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
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

var RouteType = _flowRuntime2.default.tdz(function () {
  return _types.RouteType;
});

var PathDictionaryType = _flowRuntime2.default.tdz(function () {
  return _types.PathDictionaryType;
});

var RouteRefType = _flowRuntime2.default.tdz(function () {
  return _types.RouteRefType;
});

var SegmentRouterBuilderType = _flowRuntime2.default.tdz(function () {
  return _types.SegmentRouterBuilderType;
});

var SegmentRouteType = _flowRuntime2.default.tdz(function () {
  return _index.SegmentRouteType;
});

var AddToRouteMapType = _flowRuntime2.default.type('AddToRouteMapType', _flowRuntime2.default.function(_flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('route', _flowRuntime2.default.ref(RouteType)), _flowRuntime2.default.return(_flowRuntime2.default.void())));

exports.default = function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  var _defaultLocaleType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

  _flowRuntime2.default.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);

  _flowRuntime2.default.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var _segmentRouteType = _flowRuntime2.default.ref(SegmentRouteType);

    _flowRuntime2.default.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    var getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var _localizedPathsType = _flowRuntime2.default.ref(PathDictionaryType);

      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(PathDictionaryType));

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      var completeLocalizedPaths = {};

      var getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return '' + segmentRoute.path.completePath + path;
      } : function (path, locale) {
        return '' + segmentRoute.localizedPaths.get(locale).completePath + path;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        var _localeType = _flowRuntime2.default.string();

        _flowRuntime2.default.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return _returnType.assert(completeLocalizedPaths);
    };

    var createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      var _pathType = _flowRuntime2.default.string();

      _flowRuntime2.default.param('path', _pathType).assert(path);

      var localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    var _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      var _localizedPathsType2 = _flowRuntime2.default.ref(PathDictionaryType);

      var _refType = _flowRuntime2.default.ref(RouteRefType);

      var _keyType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);

      _flowRuntime2.default.param('ref', _refType).assert(ref);

      _flowRuntime2.default.param('key', _keyType).assert(key);

      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var finalKey = _flowRuntime2.default.string().assert(key || completeLocalizedPaths[defaultLocale]);
      var route = (0, _create.createLocalizedRoute)(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createEndRoute = function _createEndRoute(path, ref, key) {
      var _pathType2 = _flowRuntime2.default.string();

      var _refType2 = _flowRuntime2.default.ref(RouteRefType);

      var _keyType2 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      _flowRuntime2.default.param('path', _pathType2).assert(path);

      _flowRuntime2.default.param('ref', _refType2).assert(ref);

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      var completePath = getCompletePath(path);
      var route = (0, _create.createRoute)(path, completePath, ref);
      var finalKey = _flowRuntime2.default.string().assert(key || completePath);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      var _localizedPathsType3 = _flowRuntime2.default.ref(PathDictionaryType);

      var _buildSegmentType = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

      _flowRuntime2.default.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType).assert(buildSegment);

      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    var _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      var _pathType3 = _flowRuntime2.default.string();

      var _buildSegmentType2 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

      _flowRuntime2.default.param('path', _pathType3).assert(path);

      _flowRuntime2.default.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      var completePath = getCompletePath(path);
      var route = (0, _create.createSegmentRoute)(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: function defaultRoute(ref, key) {
        var _refType3 = _flowRuntime2.default.ref(RouteRefType);

        var _keyType3 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.param('ref', _refType3).assert(ref);

        _flowRuntime2.default.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        var _pathType4 = _flowRuntime2.default.string();

        var _refType4 = _flowRuntime2.default.ref(RouteRefType);

        var _keyType4 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType4).assert(path);

        _flowRuntime2.default.param('ref', _refType4).assert(ref);

        _flowRuntime2.default.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        var _localizedPathsType4 = _flowRuntime2.default.ref(PathDictionaryType);

        var _refType5 = _flowRuntime2.default.ref(RouteRefType);

        var _keyType5 = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);

        _flowRuntime2.default.param('ref', _refType5).assert(ref);

        _flowRuntime2.default.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: function addSegment(path, buildSegment) {
        var _pathType5 = _flowRuntime2.default.string();

        var _buildSegmentType3 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

        _flowRuntime2.default.return(_flowRuntime2.default.void());

        _flowRuntime2.default.param('path', _pathType5).assert(path);

        _flowRuntime2.default.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        var _localizedPathsType5 = _flowRuntime2.default.ref(PathDictionaryType);

        var _buildSegmentType4 = _flowRuntime2.default.function(_flowRuntime2.default.param('builder', _flowRuntime2.default.ref(SegmentRouterBuilderType)), _flowRuntime2.default.return(_flowRuntime2.default.void()));

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
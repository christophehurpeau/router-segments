import { SegmentRouteType as _SegmentRouteType } from '../routes/index';
import { RouteType as _RouteType, PathDictionaryType as _PathDictionaryType, RouteRefType as _RouteRefType, SegmentRouterBuilderType as _SegmentRouterBuilderType } from '../types';
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';

import t from 'flow-runtime';
var RouteType = t.tdz(function () {
  return _RouteType;
});
var PathDictionaryType = t.tdz(function () {
  return _PathDictionaryType;
});
var RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
var SegmentRouterBuilderType = t.tdz(function () {
  return _SegmentRouterBuilderType;
});
var SegmentRouteType = t.tdz(function () {
  return _SegmentRouteType;
});
var AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType)), t.return(t.void())));

export default (function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  var _defaultLocaleType = t.nullable(t.string());

  t.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);
  t.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var _segmentRouteType = t.ref(SegmentRouteType);

    t.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    var getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var _localizedPathsType = t.ref(PathDictionaryType);

      var _returnType = t.return(t.ref(PathDictionaryType));

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
      var _localizedPathsType2 = t.ref(PathDictionaryType);

      var _refType = t.ref(RouteRefType);

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

      var _refType2 = t.ref(RouteRefType);

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
      var _localizedPathsType3 = t.ref(PathDictionaryType);

      var _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

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

      var _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

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
        var _refType3 = t.ref(RouteRefType);

        var _keyType3 = t.nullable(t.string());

        t.param('ref', _refType3).assert(ref);
        t.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        var _pathType4 = t.string();

        var _refType4 = t.ref(RouteRefType);

        var _keyType4 = t.nullable(t.string());

        t.return(t.void());
        t.param('path', _pathType4).assert(path);
        t.param('ref', _refType4).assert(ref);
        t.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        var _localizedPathsType4 = t.ref(PathDictionaryType);

        var _refType5 = t.ref(RouteRefType);

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

        var _buildSegmentType3 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

        t.return(t.void());
        t.param('path', _pathType5).assert(path);
        t.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        var _localizedPathsType5 = t.ref(PathDictionaryType);

        var _buildSegmentType4 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

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
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
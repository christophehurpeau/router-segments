import { SegmentRouteType as _SegmentRouteType } from '../routes/index';
import { RouteType as _RouteType, PathDictionaryType as _PathDictionaryType, RouteRefType as _RouteRefType, SegmentRouterBuilderType as _SegmentRouterBuilderType } from '../types';
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';

import t from 'flow-runtime';
const RouteType = t.tdz(function () {
  return _RouteType;
});
const PathDictionaryType = t.tdz(function () {
  return _PathDictionaryType;
});
const RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
const SegmentRouterBuilderType = t.tdz(function () {
  return _SegmentRouterBuilderType;
});
const SegmentRouteType = t.tdz(function () {
  return _SegmentRouteType;
});
const AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType)), t.return(t.void())));

export default (function createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap) {
  let _defaultLocaleType = t.nullable(t.string());

  t.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);
  t.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  const createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    let _segmentRouteType = t.ref(SegmentRouteType);

    t.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    const getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    const getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      let _localizedPathsType = t.ref(PathDictionaryType);

      const _returnType = t.return(t.ref(PathDictionaryType));

      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return `${segmentRoute.path.completePath}${path}`;
      } : function (path, locale) {
        return `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        let _localeType = t.string();

        t.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return _returnType.assert(completeLocalizedPaths);
    };

    const createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      let _pathType = t.string();

      t.param('path', _pathType).assert(path);

      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    const _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      let _localizedPathsType2 = t.ref(PathDictionaryType);

      let _refType = t.ref(RouteRefType);

      let _keyType = t.nullable(t.string());

      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType).assert(key);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = t.string().assert(key || completeLocalizedPaths[defaultLocale]);
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = function _createEndRoute(path, ref, key) {
      let _pathType2 = t.string();

      let _refType2 = t.ref(RouteRefType);

      let _keyType2 = t.nullable(t.string());

      t.param('path', _pathType2).assert(path);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType2).assert(key);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      const finalKey = t.string().assert(key || completePath);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      let _localizedPathsType3 = t.ref(PathDictionaryType);

      let _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

      t.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      let _pathType3 = t.string();

      let _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

      t.param('path', _pathType3).assert(path);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: function defaultRoute(ref, key) {
        let _refType3 = t.ref(RouteRefType);

        let _keyType3 = t.nullable(t.string());

        t.param('ref', _refType3).assert(ref);
        t.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        let _pathType4 = t.string();

        let _refType4 = t.ref(RouteRefType);

        let _keyType4 = t.nullable(t.string());

        t.return(t.void());
        t.param('path', _pathType4).assert(path);
        t.param('ref', _refType4).assert(ref);
        t.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        let _localizedPathsType4 = t.ref(PathDictionaryType);

        let _refType5 = t.ref(RouteRefType);

        let _keyType5 = t.nullable(t.string());

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);
        t.param('ref', _refType5).assert(ref);
        t.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: function addSegment(path, buildSegment) {
        let _pathType5 = t.string();

        let _buildSegmentType3 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

        t.return(t.void());
        t.param('path', _pathType5).assert(path);
        t.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        let _localizedPathsType5 = t.ref(PathDictionaryType);

        let _buildSegmentType4 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

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
import { SegmentRouteType as _SegmentRouteType } from '../routes/index';
import { RouteType as _RouteType, PathDictionaryType as _PathDictionaryType, SegmentCallbackType as _SegmentCallbackType, RouteRefType as _RouteRefType } from '../types';
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';

import t from 'flow-runtime';
const RouteType = t.tdz(() => _RouteType);
const PathDictionaryType = t.tdz(() => _PathDictionaryType);
const SegmentCallbackType = t.tdz(() => _SegmentCallbackType);
const RouteRefType = t.tdz(() => _RouteRefType);
const SegmentRouteType = t.tdz(() => _SegmentRouteType);
const AddToRouteMapType = t.type('AddToRouteMapType', t.function(t.param('key', t.string()), t.param('route', t.ref(RouteType)), t.return(t.void())));

export default t.annotate((defaultLocale, addToRouteMap) => {
  let _defaultLocaleType = t.nullable(t.string());

  t.param('defaultLocale', _defaultLocaleType).assert(defaultLocale);
  t.param('addToRouteMap', AddToRouteMapType).assert(addToRouteMap);

  const createSegmentRouterBuilder = t.annotate(function createSegmentRouterBuilder(segmentRoute) {
    let _segmentRouteType = t.ref(SegmentRouteType);

    t.param('segmentRoute', _segmentRouteType).assert(segmentRoute);

    const getCompletePath = path => segmentRoute.path.completePath + path;
    const getCompleteLocalizedPaths = t.annotate(function getCompleteLocalizedPaths(localizedPaths) {
      let _localizedPathsType = t.ref(PathDictionaryType);

      const _returnType = t.return(t.ref(PathDictionaryType));

      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? path => `${segmentRoute.path.completePath}${path}` : (path, locale) => `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;

      Object.keys(localizedPaths).forEach(t.annotate(locale => {
        let _localeType = t.string();

        t.param('locale', _localeType).assert(locale);

        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      }, t.function(t.param('locale', t.string()))));

      return _returnType.assert(completeLocalizedPaths);
    }, t.function(t.param('localizedPaths', t.ref(PathDictionaryType)), t.return(t.ref(PathDictionaryType))));

    const createLocalizedPathFromSegment = t.annotate(function createLocalizedPathFromSegment(path) {
      let _pathType = t.string();

      t.param('path', _pathType).assert(path);

      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(locale => localizedPaths[locale] = path);
      return localizedPaths;
    }, t.function(t.param('path', t.string())));

    const _createLocalizedEndRoute = t.annotate(function _createLocalizedEndRoute(localizedPaths, ref, key) {
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
    }, t.function(t.param('localizedPaths', t.ref(PathDictionaryType)), t.param('ref', t.ref(RouteRefType)), t.param('key', t.nullable(t.string()))));

    const _createEndRoute = t.annotate(function _createEndRoute(path, ref, key) {
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
    }, t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType)), t.param('key', t.nullable(t.string()))));

    const _createLocalizedSegmentRoute = t.annotate(function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      let _localizedPathsType3 = t.ref(PathDictionaryType);

      let _buildSegmentType = t.ref(SegmentCallbackType);

      t.param('localizedPaths', _localizedPathsType3).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    }, t.function(t.param('localizedPaths', t.ref(PathDictionaryType)), t.param('buildSegment', t.ref(SegmentCallbackType))));

    const _createSegmentRoute = t.annotate(function _createSegmentRoute(path, buildSegment) {
      let _pathType3 = t.string();

      let _buildSegmentType2 = t.ref(SegmentCallbackType);

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
    }, t.function(t.param('path', t.string()), t.param('buildSegment', t.ref(SegmentCallbackType))));

    return {
      defaultRoute: t.annotate((ref, key) => {
        let _refType3 = t.ref(RouteRefType);

        let _keyType3 = t.nullable(t.string());

        t.param('ref', _refType3).assert(ref);
        t.param('key', _keyType3).assert(key);

        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      }, t.function(t.param('ref', t.ref(RouteRefType)), t.param('key', t.nullable(t.string())))),

      add: t.annotate((path, ref, key) => {
        let _pathType4 = t.string();

        let _refType4 = t.ref(RouteRefType);

        let _keyType4 = t.nullable(t.string());

        t.return(t.void());
        t.param('path', _pathType4).assert(path);
        t.param('ref', _refType4).assert(ref);
        t.param('key', _keyType4).assert(key);

        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      }, t.function(t.param('path', t.string()), t.param('ref', t.ref(RouteRefType)), t.param('key', t.nullable(t.string())), t.return(t.void()))),

      addLocalized: t.annotate((localizedPaths, ref, key) => {
        let _localizedPathsType4 = t.ref(PathDictionaryType);

        let _refType5 = t.ref(RouteRefType);

        let _keyType5 = t.nullable(t.string());

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType4).assert(localizedPaths);
        t.param('ref', _refType5).assert(ref);
        t.param('key', _keyType5).assert(key);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      }, t.function(t.param('localizedPaths', t.ref(PathDictionaryType)), t.param('ref', t.ref(RouteRefType)), t.param('key', t.nullable(t.string())), t.return(t.void()))),

      addSegment: t.annotate((path, buildSegment) => {
        let _pathType5 = t.string();

        let _buildSegmentType3 = t.ref(SegmentCallbackType);

        t.return(t.void());
        t.param('path', _pathType5).assert(path);
        t.param('buildSegment', _buildSegmentType3).assert(buildSegment);

        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      }, t.function(t.param('path', t.string()), t.param('buildSegment', t.ref(SegmentCallbackType)), t.return(t.void()))),

      addLocalizedSegment: t.annotate((localizedPaths, buildSegment) => {
        let _localizedPathsType5 = t.ref(PathDictionaryType);

        let _buildSegmentType4 = t.ref(SegmentCallbackType);

        t.return(t.void());
        t.param('localizedPaths', _localizedPathsType5).assert(localizedPaths);
        t.param('buildSegment', _buildSegmentType4).assert(buildSegment);

        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }, t.function(t.param('localizedPaths', t.ref(PathDictionaryType)), t.param('buildSegment', t.ref(SegmentCallbackType)), t.return(t.void())))
    };
  }, t.function(t.param('segmentRoute', t.ref(SegmentRouteType))));
  return createSegmentRouterBuilder;
}, t.function(t.param('defaultLocale', t.nullable(t.string())), t.param('addToRouteMap', AddToRouteMapType)));
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
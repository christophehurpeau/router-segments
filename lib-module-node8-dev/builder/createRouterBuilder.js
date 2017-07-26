import { LocalesType as _LocalesType, RouterBuilderType as _RouterBuilderType, PathDictionaryType as _PathDictionaryType, RoutesType as _RoutesType, RouteMapType as _RouteMapType, RouteType as _RouteType, SegmentCallbackType as _SegmentCallbackType, RouteRefType as _RouteRefType } from '../types';
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';
import createRouter from '../router/createRouter';
import createSegmentRouterBuilderCreator from './createSegmentRouterBuilderCreator';

import t from 'flow-runtime';
const LocalesType = t.tdz(() => _LocalesType);
const RouterBuilderType = t.tdz(() => _RouterBuilderType);
const PathDictionaryType = t.tdz(() => _PathDictionaryType);
const RoutesType = t.tdz(() => _RoutesType);
const RouteMapType = t.tdz(() => _RouteMapType);
const RouteType = t.tdz(() => _RouteType);
const SegmentCallbackType = t.tdz(() => _SegmentCallbackType);
const RouteRefType = t.tdz(() => _RouteRefType);
export default (function createRouterBuilder(locales) {
  let _localesType = t.nullable(t.ref(LocalesType));

  const _returnType = t.return(t.ref(RouterBuilderType));

  t.param('locales', _localesType).assert(locales);

  const defaultLocale = locales && locales[0];
  const routes = t.ref(RoutesType).assert([]);
  const routeMap = t.ref(RouteMapType).assert(new Map());

  const addToRouteMap = (key, route) => {
    let _keyType = t.string();

    let _routeType = t.ref(RouteType);

    t.param('key', _keyType).assert(key);
    t.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: (path, ref, key) => {
      let _pathType = t.string();

      let _refType = t.ref(RouteRefType);

      let _keyType2 = t.nullable(t.string());

      t.return(t.void());
      t.param('path', _pathType).assert(path);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType2).assert(key);

      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    },

    addLocalized: (localizedPath, ref, key) => {
      let _localizedPathType = t.ref(PathDictionaryType);

      let _refType2 = t.ref(RouteRefType);

      let _keyType3 = t.nullable(t.string());

      t.return(t.void());
      t.param('localizedPath', _localizedPathType).assert(localizedPath);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPath, localizedPath, ref);
      routes.push(route);
      const finalKey = t.string().assert(key || localizedPath[defaultLocale]);
      addToRouteMap(finalKey, route);
    },

    addSegment: (path, buildSegment) => {
      let _pathType2 = t.string();

      let _buildSegmentType = t.ref(SegmentCallbackType);

      t.return(t.void());
      t.param('path', _pathType2).assert(path);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: (localizedPaths, buildSegment) => {
      let _localizedPathsType = t.ref(PathDictionaryType);

      let _buildSegmentType2 = t.ref(SegmentCallbackType);

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap)
  });
});
//# sourceMappingURL=createRouterBuilder.js.map
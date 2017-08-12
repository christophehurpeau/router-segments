import { LocalesType as _LocalesType, RouterBuilderType as _RouterBuilderType, PathDictionaryType as _PathDictionaryType, RoutesType as _RoutesType, RouteMapType as _RouteMapType, RouteType as _RouteType, SegmentRouterBuilderType as _SegmentRouterBuilderType, RouteRefType as _RouteRefType } from '../types';
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';
import _createRouter from '../router/createRouter';
import createSegmentRouterBuilderCreator from './createSegmentRouterBuilderCreator';

import t from 'flow-runtime';
var LocalesType = t.tdz(function () {
  return _LocalesType;
});
var RouterBuilderType = t.tdz(function () {
  return _RouterBuilderType;
});
var PathDictionaryType = t.tdz(function () {
  return _PathDictionaryType;
});
var RoutesType = t.tdz(function () {
  return _RoutesType;
});
var RouteMapType = t.tdz(function () {
  return _RouteMapType;
});
var RouteType = t.tdz(function () {
  return _RouteType;
});
var SegmentRouterBuilderType = t.tdz(function () {
  return _SegmentRouterBuilderType;
});
var RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
export default (function createRouterBuilder(locales) {
  var _localesType = t.nullable(t.ref(LocalesType));

  var _returnType = t.return(t.ref(RouterBuilderType));

  t.param('locales', _localesType).assert(locales);

  var defaultLocale = locales && locales[0];
  var routes = t.ref(RoutesType).assert([]);
  var routeMap = t.ref(RouteMapType).assert(new Map());

  var addToRouteMap = function addToRouteMap(key, route) {
    var _keyType = t.string();

    var _routeType = t.ref(RouteType);

    t.param('key', _keyType).assert(key);
    t.param('route', _routeType).assert(route);

    if (routeMap.has(key)) throw new Error('"' + key + '" is already used');
    routeMap.set(key, route);
  };

  var createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return _returnType.assert({
    add: function add(path, ref, key) {
      var _pathType = t.string();

      var _refType = t.ref(RouteRefType);

      var _keyType2 = t.nullable(t.string());

      t.return(t.void());
      t.param('path', _pathType).assert(path);
      t.param('ref', _refType).assert(ref);
      t.param('key', _keyType2).assert(key);

      var route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = _keyType2.assert(path);
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      var _localizedPathsType = t.ref(PathDictionaryType);

      var _refType2 = t.ref(RouteRefType);

      var _keyType3 = t.nullable(t.string());

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
      t.param('ref', _refType2).assert(ref);
      t.param('key', _keyType3).assert(key);

      if (!defaultLocale) throw new Error('Invalid locales');
      var route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      var finalKey = t.string().assert(key || localizedPaths[defaultLocale]);
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      var _pathType2 = t.string();

      var _buildSegmentType = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

      t.return(t.void());
      t.param('path', _pathType2).assert(path);
      t.param('buildSegment', _buildSegmentType).assert(buildSegment);

      var route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      var _localizedPathsType2 = t.ref(PathDictionaryType);

      var _buildSegmentType2 = t.function(t.param('builder', t.ref(SegmentRouterBuilderType)), t.return(t.void()));

      t.return(t.void());
      t.param('localizedPaths', _localizedPathsType2).assert(localizedPaths);
      t.param('buildSegment', _buildSegmentType2).assert(buildSegment);

      if (!defaultLocale) throw new Error('Invalid locales');
      var route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter() {
      return _createRouter(routes, routeMap);
    }
  });
});
//# sourceMappingURL=createRouterBuilder.js.map
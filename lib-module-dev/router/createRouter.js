import { RoutesType as _RoutesType, RouteMapType as _RouteMapType, RouterType as _RouterType, RouteMatchType as _RouteMatchType } from '../types';
import { EndRouteType as _EndRouteType } from '../routes';
import findMatch from './findMatch';

import t from 'flow-runtime';
var EndRouteType = t.tdz(function () {
  return _EndRouteType;
});
var RoutesType = t.tdz(function () {
  return _RoutesType;
});
var RouteMapType = t.tdz(function () {
  return _RouteMapType;
});
var RouterType = t.tdz(function () {
  return _RouterType;
});
var RouteMatchType = t.tdz(function () {
  return _RouteMatchType;
});
export default (function createRouter(routes, routeMap) {
  var _routesType = t.ref(RoutesType);

  var _routeMapType = t.ref(RouteMapType);

  var _returnType = t.return(t.ref(RouterType));

  t.param('routes', _routesType).assert(routes);
  t.param('routeMap', _routeMapType).assert(routeMap);

  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var _routeKeyType = t.string();

    t.param('routeKey', _routeKeyType).assert(routeKey);

    var route = routeMap.get(routeKey);
    if (!route) throw new Error('No route named "' + routeKey + '"');
    return route;
  };

  return _returnType.assert({
    get: function get(key) {
      var _keyType = t.string();

      var _returnType2 = t.return(t.nullable(t.ref(EndRouteType)));

      t.param('key', _keyType).assert(key);
      return _returnType2.assert(getRequiredRoute(key));
    },
    find: function find(path, locale) {
      var _pathType = t.string();

      var _localeType = t.nullable(t.string());

      var _returnType3 = t.return(t.nullable(t.ref(RouteMatchType)));

      t.param('path', _pathType).assert(path);
      t.param('locale', _localeType).assert(locale);
      return _returnType3.assert(findMatch(path, routes, locale));
    },
    toPath: function toPath(key, args) {
      var _keyType2 = t.string();

      var _argsType = t.any();

      var _returnType4 = t.return(t.string());

      t.param('key', _keyType2).assert(key);
      t.param('args', _argsType).assert(args);
      return _returnType4.assert(getRequiredRoute(key).getPath().toPath(args));
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      var _localeType2 = t.string();

      var _keyType3 = t.string();

      var _argsType2 = t.any();

      var _returnType5 = t.return(t.string());

      t.param('locale', _localeType2).assert(locale);
      t.param('key', _keyType3).assert(key);
      t.param('args', _argsType2).assert(args);
      return _returnType5.assert(getRequiredRoute(key).getPath(locale).toPath(args));
    }
  });
});
//# sourceMappingURL=createRouter.js.map
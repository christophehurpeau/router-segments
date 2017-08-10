import { RoutesType as _RoutesType, RouteMapType as _RouteMapType, RouterType as _RouterType, RouteMatchType as _RouteMatchType } from '../types';
import { EndRouteType as _EndRouteType } from '../routes';
import findMatch from './findMatch';

import t from 'flow-runtime';
const EndRouteType = t.tdz(() => _EndRouteType);
const RoutesType = t.tdz(() => _RoutesType);
const RouteMapType = t.tdz(() => _RouteMapType);
const RouterType = t.tdz(() => _RouterType);
const RouteMatchType = t.tdz(() => _RouteMatchType);
export default t.annotate((routes, routeMap) => {
  let _routesType = t.ref(RoutesType);

  let _routeMapType = t.ref(RouteMapType);

  const _returnType = t.return(t.ref(RouterType));

  t.param('routes', _routesType).assert(routes);
  t.param('routeMap', _routeMapType).assert(routeMap);

  const getRequiredRoute = routeKey => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return _returnType.assert({
    get: t.annotate(key => {
      let _keyType = t.string();

      const _returnType2 = t.return(t.nullable(t.ref(EndRouteType)));

      t.param('key', _keyType).assert(key);
      return _returnType2.assert(getRequiredRoute(key));
    }, t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType))))),
    find: t.annotate((path, locale) => {
      let _pathType = t.string();

      let _localeType = t.nullable(t.string());

      const _returnType3 = t.return(t.nullable(t.ref(RouteMatchType)));

      t.param('path', _pathType).assert(path);
      t.param('locale', _localeType).assert(locale);
      return _returnType3.assert(findMatch(path, routes, locale));
    }, t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string())), t.return(t.nullable(t.ref(RouteMatchType))))),
    toPath: t.annotate((key, args) => {
      let _keyType2 = t.string();

      let _argsType = t.any();

      t.param('key', _keyType2).assert(key);
      t.param('args', _argsType).assert(args);
      return getRequiredRoute(key).getPath().toPath(args);
    }, t.function(t.param('key', t.string()), t.param('args', t.any()))),
    toLocalizedPath: t.annotate((locale, key, args) => {
      let _localeType2 = t.string();

      let _keyType3 = t.string();

      let _argsType2 = t.any();

      t.param('locale', _localeType2).assert(locale);
      t.param('key', _keyType3).assert(key);
      t.param('args', _argsType2).assert(args);
      return getRequiredRoute(key).getPath(locale).toPath(args);
    }, t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any())))
  });
}, t.function(t.param('routes', t.ref(RoutesType)), t.param('routeMap', t.ref(RouteMapType)), t.return(t.ref(RouterType))));
//# sourceMappingURL=createRouter.js.map
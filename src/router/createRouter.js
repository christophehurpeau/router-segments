import type { RoutesType, RouteMapType, RouterType, RouteMatchType } from '../types';
import type { EndRouteType } from '../routes';
import findMatch from './findMatch';

export default (routes: RoutesType, routeMap: RouteMapType): RouterType => {
  const getRequiredRoute = (routeKey: string) => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: (key: string): ?EndRouteType => getRequiredRoute(key),
    find: (path: string, locale: ?string): ?RouteMatchType => findMatch(path, routes, locale),
    toPath: (key: string, args: any): string => getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (locale: string, key: string, args: any): string =>
      getRequiredRoute(key).getPath(locale).toPath(args),
  };
};

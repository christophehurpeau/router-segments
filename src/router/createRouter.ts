import { Routes, RouteMap, LocaleType } from '../types';
import { EndRoute } from '../routes/interfaces';
import findMatch, { RouteMatch } from './findMatch';

export interface Router<Locales extends LocaleType | never> {
  get(key: string): EndRoute;
  find(path: string, locale?: Locales): null | RouteMatch<Locales>;
  toLocalizedPath(locale: Locales, key: string, args?: any): string;
  toPath(key: string, args?: any): string;
}

export default function createRouter<Locales extends LocaleType | never>(
  routes: Routes<Locales>,
  routeMap: RouteMap<Locales>,
): Router<Locales> {
  const getRequiredRoute = (routeKey: string): EndRoute => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: getRequiredRoute,
    find: (path: string, locale?: Locales): null | RouteMatch<Locales> =>
      findMatch(path, routes, locale),
    toPath: (key: string, args?: any): string =>
      getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (locale: Locales, key: string, args?: any): string =>
      getRequiredRoute(key).getPath(locale).toPath(args),
  };
}

import type { EndRoute } from '../routes/interfaces';
import type { Routes, RouteMap, LocaleType } from '../types';
import type { RouteMatch } from './findMatch';
import findMatch from './findMatch';

export interface Router<Locales extends LocaleType | never = any> {
  get: (key: string) => EndRoute<Locales>;
  find: (path: string, locale?: Locales) => null | RouteMatch<Locales>;
  toLocalizedPath: (locale: Locales, key: string, args?: any) => string;
  toPath: (key: string, args?: any) => string;
}

export default function createRouter<Locales extends LocaleType | never>(
  routes: Routes<Locales>,
  routeMap: RouteMap<Locales>,
): Router<Locales> {
  const getRequiredRoute = (routeKey: string): EndRoute<Locales> => {
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

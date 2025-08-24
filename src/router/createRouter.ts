import type { EndRoute } from "../routes/interfaces.ts";
import type { LocaleType, RouteMap, Routes } from "../types.ts";
import type { RouteMatch } from "./findMatch.ts";
import { findMatch } from "./findMatch.ts";

export interface Router<Locales extends LocaleType | never, RouteRef> {
  get: (key: string) => EndRoute<Locales, RouteRef>;
  find: (
    path: string,
    locale?: Locales,
  ) => RouteMatch<Locales, RouteRef> | null;
  toLocalizedPath: (locale: Locales, key: string, args?: any) => string;
  toPath: (key: string, args?: any) => string;
}

export function createRouter<Locales extends LocaleType | never, RouteRef>(
  routes: Routes<Locales, RouteRef>,
  routeMap: RouteMap<Locales, RouteRef>,
): Router<Locales, RouteRef> {
  const getRequiredRoute = (routeKey: string): EndRoute<Locales, RouteRef> => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: getRequiredRoute,
    find: (
      path: string,
      locale?: Locales,
    ): RouteMatch<Locales, RouteRef> | null => findMatch(path, routes, locale),
    toPath: (key: string, args?: Record<string, any>): string =>
      getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (
      locale: Locales,
      key: string,
      args?: Record<string, any>,
    ): string => getRequiredRoute(key).getPath(locale).toPath(args),
  };
}

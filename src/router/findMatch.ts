/* eslint-disable complexity */
import { Logger } from 'nightingale-logger';
import type { EndRoute, Route, SegmentRoute } from '../routes/interfaces';
import type {
  LocaleType,
  RoutePathInterface,
  RouteRef,
  SegmentRoutePath,
  EndRoutePath,
} from '../types';

export interface RouteMatch<Locales extends LocaleType | never = any> {
  namedParams: Map<string, string> | undefined;
  otherParams: string[] | undefined;
  path: string;
  ref: RouteRef;
  route: Route<any, Locales>;
  routePath: EndRoutePath | SegmentRoutePath;
}

const logger = __DEV__ ? new Logger('router-segments:findMatch') : undefined;

const parseOtherParams = (wildcard: string): string[] =>
  wildcard ? wildcard.split('/') : [];

const internalFindMatch = <Locales extends LocaleType>(
  path: string,
  completePath: string,
  routes: Route<RoutePathInterface, Locales>[],
  locale: Locales = 'en' as Locales,
  namedParams?: Map<number | string, string>,
): RouteMatch<Locales> | null => {
  let result = null;

  routes.some((route): boolean => {
    const routePath: RoutePathInterface = route.getPath(locale);

    if (__DEV__ && !routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    if (__DEV__ && logger) {
      logger.debug(`trying ${routePath.regExp.toString()}`);
    }

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length > 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach((paramName: number | string) => {
        namedParams!.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      const segment = route as SegmentRoute;
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = internalFindMatch(
          `/${restOfThePath}`,
          completePath,
          segment.nestedRoutes,
          locale,
          namedParams,
        );

        return result !== null;
      }

      if (!segment.defaultRoute) {
        return false;
      }

      route = segment.defaultRoute;
    }

    const endRoute = route as EndRoute;

    const otherParams =
      group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ref: endRoute.ref,
      path: completePath,
      route: endRoute,
      routePath,
      namedParams,
      otherParams,
    });

    return true;
  });

  return result;
};

export function findMatch<Locales extends LocaleType>(
  path: string,
  routes: Route<RoutePathInterface, Locales>[],
  locale?: Locales,
): RouteMatch<Locales> | null {
  return internalFindMatch(path, path, routes, locale);
}

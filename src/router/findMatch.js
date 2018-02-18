import Logger from 'nightingale-logger';
import type {
  RoutesType,
  LocaleType,
  RouteMatchType,
  SegmentRoutePathType,
  RoutePathType,
} from '../types';
import type { RouteType } from '../routes/index';

const logger = !PRODUCTION && new Logger('router-segments:findMatch');

const parseOtherParams = (wildcard: string) => (wildcard ? wildcard.split('/') : []);

const findMatch = (
  path: string,
  completePath: string,
  routes: RoutesType,
  locale: LocaleType,
  namedParams: ?Map<string, string>,
): ?RouteMatchType => {
  let result = null;

  routes.some((route: RouteType) => {
    const routePath: ?SegmentRoutePathType | RoutePathType = route.getPath(locale);

    if (!PRODUCTION && !routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    if (!PRODUCTION) logger.debug(`trying ${routePath.regExp}`);

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach((paramName: string) => {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch(
          `/${restOfThePath}`,
          completePath,
          route.nestedRoutes,
          locale,
          namedParams,
        );

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = route.defaultRoute;
    }

    const otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route,
      routePath,
      namedParams,
      otherParams,
    });

    return true;
  });

  return result;
};

export default (path: string, routes: RoutesType, locale: LocaleType = 'en'): ?RouteMatchType =>
  findMatch(path, path, routes, locale);

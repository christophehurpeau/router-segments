/* eslint-disable complexity */
import { Logger } from "nightingale-logger";
import type { EndRoute, Route, SegmentRoute } from "../routes/interfaces";
import type {
  EndRoutePath,
  LocaleType,
  RoutePathInterface,
  SegmentRoutePath,
} from "../types";

export interface RouteMatch<Locales extends LocaleType | never, RouteRef> {
  namedParams: Map<string, string> | undefined;
  otherParams: string[] | undefined;
  path: string;
  ref: RouteRef;
  route: Route<any, Locales, RouteRef>;
  routePath: EndRoutePath | SegmentRoutePath;
}

const logger =
  process.env.NODE_ENV !== "production"
    ? new Logger("router-segments:findMatch")
    : undefined;

const parseOtherParams = (wildcard?: string): string[] =>
  wildcard ? wildcard.split("/") : [];

interface InternalFindMatchParams<Locales extends LocaleType, RouteRef> {
  path: string;
  completePath: string;
  routes: Route<RoutePathInterface, Locales, RouteRef>[];
  locale?: Locales;
  namedParams?: Map<number | string, string>;
}

const internalFindMatch = <Locales extends LocaleType, RouteRef>({
  path,
  completePath,
  routes,
  locale = "en" as Locales,
  namedParams,
}: InternalFindMatchParams<Locales, RouteRef>): RouteMatch<
  Locales,
  RouteRef
> | null => {
  let result = null;

  routes.some((route): boolean => {
    const routePath: RoutePathInterface = route.getPath(locale);

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "production" && !routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "production" && logger) {
      logger.debug(`trying ${routePath.regExp.toString()}`);
    }

    const match = routePath.regExp.exec(path);
    // logger.info('trytomatch', { path, regExp: routePath.regExp, match });
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length > 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach((paramName: number | string) => {
        const paramValue = match[group++];
        namedParams!.set(paramName, paramValue!);
      });
    }

    if (route.isSegment()) {
      const segment = route as SegmentRoute<Locales, RouteRef>;
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = internalFindMatch({
          path: `/${restOfThePath}`,
          completePath,
          routes: segment.nestedRoutes,
          locale,
          namedParams,
        });

        return result !== null;
      }

      if (!segment.defaultRoute) {
        return false;
      }

      route = segment.defaultRoute;
    }

    const endRoute = route as EndRoute<Locales, RouteRef>;

    const otherParams =
      group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
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

export function findMatch<Locales extends LocaleType, RouteRef>(
  path: string,
  routes: Route<RoutePathInterface, Locales, RouteRef>[],
  locale?: Locales,
): RouteMatch<Locales, RouteRef> | null {
  return internalFindMatch({ path, completePath: path, routes, locale });
}

import type {
  EndRoutePath,
  LocaleType,
  LocalizedPathsRecord,
  SegmentRoutePath,
} from "../types";
import { getKeys } from "../utils/getKeys";
import { LocalizedEndRoute } from "./LocalizedEndRoute";
import { LocalizedSegmentRoute } from "./LocalizedSegmentRoute";
import { NotLocalizedEndRoute as Route } from "./NotLocalizedEndRoute";
import { NotLocalizedSegmentRoute } from "./NotLocalizedSegmentRoute";
import { createRoutePath, createRoutePathSegment } from "./createRoutePath";

const createLocalizedPaths = <
  Locales extends LocaleType,
  Path extends EndRoutePath | SegmentRoutePath,
>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
  segment: boolean,
): Map<Locales, Path> => {
  const localizedPaths = new Map<Locales, Path>();
  getKeys(localizedPathsRecord).forEach((locale: Locales) => {
    const path = localizedPathsRecord[locale];
    if (segment) {
      const routerPath: SegmentRoutePath = createRoutePathSegment(
        path,
        completeLocalizedPathsRecord[locale],
      );
      localizedPaths.set(locale, routerPath as Path);
    } else {
      const routerPath: EndRoutePath = createRoutePath(
        path,
        completeLocalizedPathsRecord[locale],
      );
      localizedPaths.set(locale, routerPath as Path);
    }
  });
  return localizedPaths;
};

const checkRef = <RouteRef>(ref: RouteRef): void => {
  if (!ref) throw new Error(`Invalid ref: "${JSON.stringify(ref)}"`);
};

export const createRoute = <Locales extends LocaleType, RouteRef>(
  path: string,
  completePath: string,
  ref: RouteRef,
): Route<Locales, RouteRef> => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") {
    if (path.includes("(.*)")) {
      throw new Error("Wildcard is not supported using regexp");
    }
    checkRef(ref);
  }
  const routePath: EndRoutePath = createRoutePath(path, completePath);
  return new Route(routePath, ref);
};

export const createLocalizedRoute = <Locales extends LocaleType, RouteRef>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
  ref: RouteRef,
): LocalizedEndRoute<Locales, RouteRef> => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== "production") checkRef(ref);
  const localizedPaths = createLocalizedPaths<Locales, EndRoutePath>(
    localizedPathsRecord,
    completeLocalizedPathsRecord,
    false,
  );
  return new LocalizedEndRoute(localizedPaths, ref);
};

export const createSegmentRoute = <Locales extends LocaleType, RouteRef>(
  path: string,
  completePath: string,
): NotLocalizedSegmentRoute<Locales, RouteRef> => {
  const routePath = createRoutePathSegment(path, completePath);
  return new NotLocalizedSegmentRoute(routePath);
};

export const createLocalizedSegmentRoute = <
  Locales extends LocaleType,
  RouteRef,
>(
  localizedPathsRecord: LocalizedPathsRecord<Locales>,
  completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>,
): LocalizedSegmentRoute<Locales, RouteRef> => {
  const localizedPaths = createLocalizedPaths<Locales, SegmentRoutePath>(
    localizedPathsRecord,
    completeLocalizedPathsRecord,
    true,
  );
  return new LocalizedSegmentRoute(localizedPaths);
};

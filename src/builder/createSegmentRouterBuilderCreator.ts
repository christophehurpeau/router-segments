import type { LocalizedSegmentRoute, LocalizedEndRoute } from "../routes";
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from "../routes/create";
import type { EndRoute, SegmentRoute } from "../routes/interfaces";
import type { LocalizedPathsRecord, LocaleType } from "../types";
import { getKeys } from "../utils/getKeys";

export interface SegmentRouterBuilder<Locales extends LocaleType, RouteRef> {
  add: (path: string, ref: RouteRef, key?: string) => void;
  addLocalized: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    ref: RouteRef,
    key?: string,
  ) => void;
  addLocalizedSegment: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void,
  ) => void;
  addSegment: (
    path: string,
    buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void,
  ) => void;
  defaultRoute: (ref: RouteRef, key?: string) => void;
}

export function createSegmentRouterBuilderCreator<
  Locales extends LocaleType,
  RouteRef,
>(
  defaultLocale: Locales | undefined,
  addToRouteMap: (key: string, route: EndRoute<Locales, RouteRef>) => void,
): (
  segmentRoute: SegmentRoute<Locales, RouteRef>,
) => SegmentRouterBuilder<Locales, RouteRef> {
  const createSegmentRouterBuilder = (
    segmentRoute: SegmentRoute<Locales, RouteRef>,
  ): SegmentRouterBuilder<Locales, RouteRef> => {
    const getCompletePath = (path: string, locale?: Locales): string =>
      `${segmentRoute.getPath(locale).completePath}${path}`;

    const getCompleteLocalizedPaths = (
      localizedPaths: LocalizedPathsRecord<Locales>,
    ): LocalizedPathsRecord<Locales> => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const completeLocalizedPaths: Record<Locales, string> = {} as Record<
        Locales,
        string
      >;

      getKeys(localizedPaths).forEach((locale: Locales) => {
        completeLocalizedPaths[locale] = getCompletePath(
          localizedPaths[locale],
          locale,
        );
      });

      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = (
      segmentRoute: LocalizedSegmentRoute<Locales, RouteRef>,
      path: string,
    ): Record<Locales, string> => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const localizedPaths: Record<Locales, string> = {} as Record<
        Locales,
        string
      >;
      [...segmentRoute.localizedPaths.keys()].forEach((locale) => {
        localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    const _createLocalizedEndRoute = (
      localizedPaths: LocalizedPathsRecord<Locales>,
      ref: RouteRef,
      key?: string,
    ): LocalizedEndRoute<Locales, RouteRef> => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey: string = key || completeLocalizedPaths[defaultLocale!];
      const route = createLocalizedRoute(
        localizedPaths,
        completeLocalizedPaths,
        ref,
      );
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = (
      path: string,
      ref: RouteRef,
      key?: string,
    ): EndRoute<Locales, RouteRef> => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedEndRoute(
          createLocalizedPathFromSegment(
            segmentRoute as LocalizedSegmentRoute<Locales, RouteRef>,
            path,
          ),
          ref,
          key,
        );
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      const finalKey: string = key || completePath;
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createLocalizedSegmentRoute = (
      localizedPaths: LocalizedPathsRecord<Locales>,
      buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void,
    ): LocalizedSegmentRoute<Locales, RouteRef> => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute<Locales, RouteRef>(
        localizedPaths,
        completeLocalizedPaths,
      );
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (
      path: string,
      buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void,
    ): SegmentRoute<Locales, RouteRef> => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedSegmentRoute(
          createLocalizedPathFromSegment(
            segmentRoute as LocalizedSegmentRoute<Locales, RouteRef>,
            path,
          ),
          buildSegment,
        );
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute<Locales, RouteRef>(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: (ref: RouteRef, key?: string): void => {
        segmentRoute.defaultRoute = _createEndRoute("", ref, key);
      },

      add: (path: string, ref: RouteRef, key?: string): void => {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: (
        localizedPaths: LocalizedPathsRecord<Locales>,
        ref: RouteRef,
        key?: string,
      ): void => {
        if (!defaultLocale) throw new Error("Invalid locales");
        segmentRoute.nestedRoutes.push(
          _createLocalizedEndRoute(localizedPaths, ref, key),
        );
      },

      addSegment: (
        path: string,
        buildSegment: (
          builder: SegmentRouterBuilder<Locales, RouteRef>,
        ) => void,
      ): void => {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: (
        localizedPaths: LocalizedPathsRecord<Locales>,
        buildSegment: (
          builder: SegmentRouterBuilder<Locales, RouteRef>,
        ) => void,
      ): void => {
        if (!defaultLocale) throw new Error("Invalid locales");
        segmentRoute.nestedRoutes.push(
          _createLocalizedSegmentRoute(localizedPaths, buildSegment),
        );
      },
    };
  };
  return createSegmentRouterBuilder;
}

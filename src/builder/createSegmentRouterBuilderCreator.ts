import type { LocalizedSegmentRoute, LocalizedEndRoute } from '../routes';
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from '../routes/create';
import type { EndRoute, SegmentRoute } from '../routes/interfaces';
import type { LocalizedPathsRecord, RouteRef, LocaleType } from '../types';
import { getKeys } from '../utils/getKeys';

export interface SegmentRouterBuilder<Locales extends LocaleType> {
  add: (path: string, ref: RouteRef, key?: string) => void;
  addLocalized: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    ref: RouteRef,
    key?: string,
  ) => void;
  addLocalizedSegment: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
  ) => void;
  addSegment: (
    path: string,
    buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
  ) => void;
  defaultRoute: (ref: RouteRef, key?: string) => void;
}

export function createSegmentRouterBuilderCreator<Locales extends LocaleType>(
  defaultLocale: Locales | undefined,
  addToRouteMap: (key: string, route: EndRoute<Locales>) => void,
): (segmentRoute: SegmentRoute<Locales>) => SegmentRouterBuilder<Locales> {
  const createSegmentRouterBuilder = (
    segmentRoute: SegmentRoute<Locales>,
  ): SegmentRouterBuilder<Locales> => {
    const getCompletePath = (path: string, locale?: Locales): string =>
      `${segmentRoute.getPath(locale).completePath}${path}`;

    const getCompleteLocalizedPaths = (
      localizedPaths: LocalizedPathsRecord<Locales>,
    ): LocalizedPathsRecord<Locales> => {
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      segmentRoute: LocalizedSegmentRoute<Locales>,
      path: string,
    ): Record<Locales, string> => {
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
    ): LocalizedEndRoute<Locales> => {
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
    ): EndRoute<Locales> => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedEndRoute(
          createLocalizedPathFromSegment(
            segmentRoute as LocalizedSegmentRoute<Locales>,
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
      buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
    ): LocalizedSegmentRoute<Locales> => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(
        localizedPaths,
        completeLocalizedPaths,
      );
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (
      path: string,
      buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
    ): SegmentRoute<Locales> => {
      if (segmentRoute.isLocalized()) {
        return _createLocalizedSegmentRoute(
          createLocalizedPathFromSegment(
            segmentRoute as LocalizedSegmentRoute<Locales>,
            path,
          ),
          buildSegment,
        );
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: (ref: RouteRef, key?: string): void => {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: (path: string, ref: RouteRef, key?: string): void => {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: (
        localizedPaths: LocalizedPathsRecord<Locales>,
        ref: RouteRef,
        key?: string,
      ): void => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(
          _createLocalizedEndRoute(localizedPaths, ref, key),
        );
      },

      addSegment: (
        path: string,
        buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
      ): void => {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: (
        localizedPaths: LocalizedPathsRecord<Locales>,
        buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
      ): void => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(
          _createLocalizedSegmentRoute(localizedPaths, buildSegment),
        );
      },
    };
  };
  return createSegmentRouterBuilder;
}

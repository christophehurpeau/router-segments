import type { SegmentRouteType } from '../routes/index';
import type {
  RouteType,
  PathDictionaryType,
  RouteRefType,
  SegmentRouterBuilderType,
} from '../types';
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from '../routes/create';

type AddToRouteMapType = (key: string, route: RouteType) => void;
export default (defaultLocale: ?string, addToRouteMap: AddToRouteMapType) => {
  const createSegmentRouterBuilder = (segmentRoute: SegmentRouteType) => {
    const getCompletePath = path => segmentRoute.path.completePath + path;
    const getCompleteLocalizedPaths = (localizedPaths: PathDictionaryType): PathDictionaryType => {
      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths
        ? (path, locale) => `${segmentRoute.path.completePath}${path}`
        : (path, locale) => `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;

      Object.keys(localizedPaths).forEach((locale: string) => {
        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = (path: string) => {
      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(
        locale => (localizedPaths[locale] = path),
      );
      return localizedPaths;
    };

    const _createLocalizedEndRoute = (
      localizedPaths: PathDictionaryType,
      ref: RouteRefType,
      key: ?string,
    ) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey: string = key || completeLocalizedPaths[defaultLocale];
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = (path: string, ref: RouteRefType, key: ?string) => {
      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);
      const finalKey: string = key || completePath;
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createLocalizedSegmentRoute = (
      localizedPaths: PathDictionaryType,
      buildSegment: (builder: SegmentRouterBuilderType) => void,
    ) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (
      path: string,
      buildSegment: (builder: SegmentRouterBuilderType) => void,
    ) => {
      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      const completePath = getCompletePath(path);
      const route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: (ref: RouteRefType, key: ?string) => {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: (path: string, ref: RouteRefType, key: ?string): void => {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: (localizedPaths: PathDictionaryType, ref: RouteRefType, key: ?string): void => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: (
        path: string,
        buildSegment: (builder: SegmentRouterBuilderType) => void,
      ): void => {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: (
        localizedPaths: PathDictionaryType,
        buildSegment: (builder: SegmentRouterBuilderType) => void,
      ): void => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      },
    };
  };
  return createSegmentRouterBuilder;
};

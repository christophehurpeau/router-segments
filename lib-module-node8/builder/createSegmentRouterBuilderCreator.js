
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';

export default ((defaultLocale, addToRouteMap) => {
  const createSegmentRouterBuilder = segmentRoute => {
    const getCompletePath = path => segmentRoute.path.completePath + path;
    const getCompleteLocalizedPaths = localizedPaths => {
      const completeLocalizedPaths = {};

      const getCompletePathForLocale = !segmentRoute.localizedPaths ? path => `${segmentRoute.path.completePath}${path}` : (path, locale) => `${segmentRoute.localizedPaths.get(locale).completePath}${path}`;

      Object.keys(localizedPaths).forEach(locale => {
        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return completeLocalizedPaths;
    };

    const createLocalizedPathFromSegment = path => {
      const localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(locale => localizedPaths[locale] = path);
      return localizedPaths;
    };

    const _createLocalizedEndRoute = (localizedPaths, ref, key) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const finalKey = key || completeLocalizedPaths[defaultLocale];
      const route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    const _createEndRoute = (path, ref, key) => {
      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      const completePath = getCompletePath(path);
      const route = createRoute(path, completePath, ref);

      addToRouteMap(key || completePath, route);
      return route;
    };

    const _createLocalizedSegmentRoute = (localizedPaths, buildSegment) => {
      const completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      const route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    const _createSegmentRoute = (path, buildSegment) => {
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
      defaultRoute: (ref, key) => {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: (path, ref, key) => {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: (localizedPaths, ref, key) => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: (path, buildSegment) => {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: (localizedPaths, buildSegment) => {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };
  return createSegmentRouterBuilder;
});
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
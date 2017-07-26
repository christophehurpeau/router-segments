
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';
import createRouter from '../router/createRouter';
import createSegmentRouterBuilderCreator from './createSegmentRouterBuilderCreator';

export default (locales => {
  const defaultLocale = locales && locales[0];
  const routes = [];
  const routeMap = new Map();

  const addToRouteMap = (key, route) => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return {
    add: (path, ref, key) => {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: (localizedPath, ref, key) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPath, localizedPath, ref);
      routes.push(route);
      const finalKey = key || localizedPath[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: (path, buildSegment) => {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: (localizedPaths, buildSegment) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap)
  };
});
//# sourceMappingURL=createRouterBuilder.js.map
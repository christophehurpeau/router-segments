
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';
import _createRouter from '../router/createRouter';
import createSegmentRouterBuilderCreator from './createSegmentRouterBuilderCreator';

export default (function (locales) {
  const defaultLocale = locales && locales[0];
  const routes = [];
  const routeMap = new Map();

  const addToRouteMap = function addToRouteMap(key, route) {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(defaultLocale, addToRouteMap);

  return {
    add: function add(path, ref, key) {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter() {
      return _createRouter(routes, routeMap);
    }
  };
});
//# sourceMappingURL=createRouterBuilder.js.map

import findMatch from './findMatch';

export default (function (routes, routeMap) {
  const getRequiredRoute = function getRequiredRoute(routeKey) {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: function get(key) {
      return getRequiredRoute(key);
    },
    find: function find(path, locale) {
      return findMatch(path, routes, locale);
    },
    toPath: function toPath(key, args) {
      return getRequiredRoute(key).getPath().toPath(args);
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      return getRequiredRoute(key).getPath(locale).toPath(args);
    }
  };
});
//# sourceMappingURL=createRouter.js.map
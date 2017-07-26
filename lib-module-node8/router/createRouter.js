
import findMatch from './findMatch';

export default ((routes, routeMap) => {
  const getRequiredRoute = routeKey => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: key => getRequiredRoute(key),
    find: (path, locale) => findMatch(path, routes, locale),
    toPath: (key, args) => getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (locale, key, args) => getRequiredRoute(key).getPath(locale).toPath(args)
  };
});
//# sourceMappingURL=createRouter.js.map
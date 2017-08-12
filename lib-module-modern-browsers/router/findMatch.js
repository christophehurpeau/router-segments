

const logger = false;

const parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

const findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  let result = null;

  routes.some(function (route) {
    const routePath = route.getPath(locale);

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach(function (paramName) {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      const restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch(`/${restOfThePath}`, completePath, route.nestedRoutes, locale, namedParams);

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = route.defaultRoute;
    }

    const otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route,
      routePath,
      namedParams,
      otherParams
    });

    return true;
  });

  return result;
};

export default (function (path, routes, locale = 'en') {
  return findMatch(path, path, routes, locale);
});
//# sourceMappingURL=findMatch.js.map
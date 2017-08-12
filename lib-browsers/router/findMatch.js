'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var logger = false;

var parseOtherParams = function parseOtherParams(wildcard) {
  return wildcard ? wildcard.split('/') : [];
};

var findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  var result = null;

  routes.some(function (route) {
    var routePath = route.getPath(locale);

    var match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    var groupCount = match.length;
    var group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = new Map();

      routePath.namedParams.forEach(function (paramName) {
        namedParams.set(paramName, match[group++]);
      });
    }

    if (route.isSegment()) {
      var restOfThePath = match[--groupCount];

      if (restOfThePath) {
        result = findMatch('/' + restOfThePath, completePath, route.nestedRoutes, locale, namedParams);

        return result !== null;
      }

      if (!route.defaultRoute) {
        return false;
      }

      route = route.defaultRoute;
    }

    var otherParams = group + 1 !== groupCount ? undefined : parseOtherParams(match[group]);

    result = Object.freeze({
      ref: route.ref,
      path: completePath,
      route: route,
      routePath: routePath,
      namedParams: namedParams,
      otherParams: otherParams
    });

    return true;
  });

  return result;
};

exports.default = function (path, routes) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';
  return findMatch(path, path, routes, locale);
};
//# sourceMappingURL=findMatch.js.map
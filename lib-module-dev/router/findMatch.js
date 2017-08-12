import Logger from 'nightingale-logger';
import { RoutesType as _RoutesType, LocaleType as _LocaleType, RouteMatchType as _RouteMatchType } from '../types';
import { RouteType as _RouteType } from '../routes/index';

import t from 'flow-runtime';
var RouteType = t.tdz(function () {
  return _RouteType;
});
var RoutesType = t.tdz(function () {
  return _RoutesType;
});
var LocaleType = t.tdz(function () {
  return _LocaleType;
});
var RouteMatchType = t.tdz(function () {
  return _RouteMatchType;
});
var logger = new Logger('router-segments:findMatch');

var parseOtherParams = function parseOtherParams(wildcard) {
  var _wildcardType = t.string();

  t.param('wildcard', _wildcardType).assert(wildcard);
  return wildcard ? wildcard.split('/') : [];
};

var findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _routesType = t.ref(RoutesType);

  var _localeType = t.ref(LocaleType);

  var _namedParamsType = t.nullable(t.ref('Map', t.string(), t.string()));

  var _returnType = t.return(t.nullable(t.ref(RouteMatchType)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('routes', _routesType).assert(routes);
  t.param('locale', _localeType).assert(locale);
  t.param('namedParams', _namedParamsType).assert(namedParams);

  var result = null;

  routes.some(function (route) {
    var _routeType = t.ref(RouteType);

    t.param('route', _routeType).assert(route);

    var routePath = route.getPath(locale);

    if (!routePath) {
      throw new Error('Unknown localized route for locale ' + locale);
    }

    /* istanbul ignore next */
    logger.debug('trying ' + routePath.regExp);

    var match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    var groupCount = match.length;
    var group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = _namedParamsType.assert(new Map());

      routePath.namedParams.forEach(function (paramName) {
        var _paramNameType = t.string();

        t.param('paramName', _paramNameType).assert(paramName);

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

      route = _routeType.assert(route.defaultRoute);
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

  return _returnType.assert(result);
};

export default (function findMatch0(path, routes) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  var _pathType2 = t.string();

  var _routesType2 = t.ref(RoutesType);

  var _localeType2 = t.ref(LocaleType);

  var _returnType2 = t.return(t.nullable(t.ref(RouteMatchType)));

  t.param('path', _pathType2).assert(path);
  t.param('routes', _routesType2).assert(routes);
  t.param('locale', _localeType2).assert(locale);
  return _returnType2.assert(findMatch(path, path, routes, locale));
});
//# sourceMappingURL=findMatch.js.map
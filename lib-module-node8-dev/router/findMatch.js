import Logger from 'nightingale-logger';
import { RoutesType as _RoutesType, LocaleType as _LocaleType, RouteMatchType as _RouteMatchType } from '../types';
import { RouteType as _RouteType } from '../routes/index';

import t from 'flow-runtime';
const RouteType = t.tdz(() => _RouteType);
const RoutesType = t.tdz(() => _RoutesType);
const LocaleType = t.tdz(() => _LocaleType);
const RouteMatchType = t.tdz(() => _RouteMatchType);
const logger = new Logger('router-segments:findMatch');

const parseOtherParams = t.annotate(function parseOtherParams(wildcard) {
  let _wildcardType = t.string();

  t.param('wildcard', _wildcardType).assert(wildcard);
  return wildcard ? wildcard.split('/') : [];
}, t.function(t.param('wildcard', t.string())));

const findMatch = t.annotate(function findMatch(path, completePath, routes, locale, namedParams) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _routesType = t.ref(RoutesType);

  let _localeType = t.ref(LocaleType);

  let _namedParamsType = t.nullable(t.ref('Map', t.string(), t.string()));

  const _returnType = t.return(t.nullable(t.ref(RouteMatchType)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('routes', _routesType).assert(routes);
  t.param('locale', _localeType).assert(locale);
  t.param('namedParams', _namedParamsType).assert(namedParams);

  let result = null;

  routes.some(t.annotate(route => {
    let _routeType = t.ref(RouteType);

    t.param('route', _routeType).assert(route);

    const routePath = route.getPath(locale);

    if (!routePath) {
      throw new Error(`Unknown localized route for locale ${locale}`);
    }

    /* istanbul ignore next */
    logger.debug(`trying ${routePath.regExp}`);

    const match = routePath.regExp.exec(path);
    if (!match) return false;

    match.shift(); // remove m[0], === path;

    let groupCount = match.length;
    let group = 0;

    if (routePath.namedParams.length !== 0) {
      // set params
      if (!namedParams) namedParams = _namedParamsType.assert(new Map());

      routePath.namedParams.forEach(t.annotate(paramName => {
        let _paramNameType = t.string();

        t.param('paramName', _paramNameType).assert(paramName);

        namedParams.set(paramName, match[group++]);
      }, t.function(t.param('paramName', t.string()))));
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

      route = _routeType.assert(route.defaultRoute);
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
  }, t.function(t.param('route', t.ref(RouteType)))));

  return _returnType.assert(result);
}, t.function(t.param('path', t.string()), t.param('completePath', t.string()), t.param('routes', t.ref(RoutesType)), t.param('locale', t.ref(LocaleType)), t.param('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.return(t.nullable(t.ref(RouteMatchType)))));

export default t.annotate((path, routes, locale = 'en') => {
  let _pathType2 = t.string();

  let _routesType2 = t.ref(RoutesType);

  let _localeType2 = t.ref(LocaleType);

  const _returnType2 = t.return(t.nullable(t.ref(RouteMatchType)));

  t.param('path', _pathType2).assert(path);
  t.param('routes', _routesType2).assert(routes);
  t.param('locale', _localeType2).assert(locale);
  return _returnType2.assert(findMatch(path, path, routes, locale));
}, t.function(t.param('path', t.string()), t.param('routes', t.ref(RoutesType)), t.param('locale', t.ref(LocaleType)), t.return(t.nullable(t.ref(RouteMatchType)))));
//# sourceMappingURL=findMatch.js.map
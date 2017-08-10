'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _types = require('../types');

var _index = require('../routes/index');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteType = _flowRuntime2.default.tdz(() => _index.RouteType);

const RoutesType = _flowRuntime2.default.tdz(() => _types.RoutesType);

const LocaleType = _flowRuntime2.default.tdz(() => _types.LocaleType);

const RouteMatchType = _flowRuntime2.default.tdz(() => _types.RouteMatchType);

const logger = new _nightingaleLogger2.default('router-segments:findMatch');

const parseOtherParams = _flowRuntime2.default.annotate(function parseOtherParams(wildcard) {
  let _wildcardType = _flowRuntime2.default.string();

  _flowRuntime2.default.param('wildcard', _wildcardType).assert(wildcard);

  return wildcard ? wildcard.split('/') : [];
}, _flowRuntime2.default.function(_flowRuntime2.default.param('wildcard', _flowRuntime2.default.string())));

const findMatch = _flowRuntime2.default.annotate(function findMatch(path, completePath, routes, locale, namedParams) {
  let _pathType = _flowRuntime2.default.string();

  let _completePathType = _flowRuntime2.default.string();

  let _routesType = _flowRuntime2.default.ref(RoutesType);

  let _localeType = _flowRuntime2.default.ref(LocaleType);

  let _namedParamsType = _flowRuntime2.default.nullable(_flowRuntime2.default.ref('Map', _flowRuntime2.default.string(), _flowRuntime2.default.string()));

  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

  _flowRuntime2.default.param('path', _pathType).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType).assert(completePath);

  _flowRuntime2.default.param('routes', _routesType).assert(routes);

  _flowRuntime2.default.param('locale', _localeType).assert(locale);

  _flowRuntime2.default.param('namedParams', _namedParamsType).assert(namedParams);

  let result = null;

  routes.some(_flowRuntime2.default.annotate(route => {
    let _routeType = _flowRuntime2.default.ref(RouteType);

    _flowRuntime2.default.param('route', _routeType).assert(route);

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

      routePath.namedParams.forEach(_flowRuntime2.default.annotate(paramName => {
        let _paramNameType = _flowRuntime2.default.string();

        _flowRuntime2.default.param('paramName', _paramNameType).assert(paramName);

        namedParams.set(paramName, match[group++]);
      }, _flowRuntime2.default.function(_flowRuntime2.default.param('paramName', _flowRuntime2.default.string()))));
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
  }, _flowRuntime2.default.function(_flowRuntime2.default.param('route', _flowRuntime2.default.ref(RouteType)))));

  return _returnType.assert(result);
}, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.param('routes', _flowRuntime2.default.ref(RoutesType)), _flowRuntime2.default.param('locale', _flowRuntime2.default.ref(LocaleType)), _flowRuntime2.default.param('namedParams', _flowRuntime2.default.nullable(_flowRuntime2.default.ref('Map', _flowRuntime2.default.string(), _flowRuntime2.default.string()))), _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)))));

exports.default = _flowRuntime2.default.annotate((path, routes, locale = 'en') => {
  let _pathType2 = _flowRuntime2.default.string();

  let _routesType2 = _flowRuntime2.default.ref(RoutesType);

  let _localeType2 = _flowRuntime2.default.ref(LocaleType);

  const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

  _flowRuntime2.default.param('path', _pathType2).assert(path);

  _flowRuntime2.default.param('routes', _routesType2).assert(routes);

  _flowRuntime2.default.param('locale', _localeType2).assert(locale);

  return _returnType2.assert(findMatch(path, path, routes, locale));
}, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('routes', _flowRuntime2.default.ref(RoutesType)), _flowRuntime2.default.param('locale', _flowRuntime2.default.ref(LocaleType)), _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)))));
//# sourceMappingURL=findMatch.js.map
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

var RouteType = _flowRuntime2.default.tdz(function () {
  return _index.RouteType;
});

var RoutesType = _flowRuntime2.default.tdz(function () {
  return _types.RoutesType;
});

var LocaleType = _flowRuntime2.default.tdz(function () {
  return _types.LocaleType;
});

var RouteMatchType = _flowRuntime2.default.tdz(function () {
  return _types.RouteMatchType;
});

var logger = new _nightingaleLogger2.default('router-segments:findMatch');

var parseOtherParams = function parseOtherParams(wildcard) {
  var _wildcardType = _flowRuntime2.default.string();

  _flowRuntime2.default.param('wildcard', _wildcardType).assert(wildcard);

  return wildcard ? wildcard.split('/') : [];
};

var findMatch = function findMatch(path, completePath, routes, locale, namedParams) {
  var _pathType = _flowRuntime2.default.string();

  var _completePathType = _flowRuntime2.default.string();

  var _routesType = _flowRuntime2.default.ref(RoutesType);

  var _localeType = _flowRuntime2.default.ref(LocaleType);

  var _namedParamsType = _flowRuntime2.default.nullable(_flowRuntime2.default.ref('Map', _flowRuntime2.default.string(), _flowRuntime2.default.string()));

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

  _flowRuntime2.default.param('path', _pathType).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType).assert(completePath);

  _flowRuntime2.default.param('routes', _routesType).assert(routes);

  _flowRuntime2.default.param('locale', _localeType).assert(locale);

  _flowRuntime2.default.param('namedParams', _namedParamsType).assert(namedParams);

  var result = null;

  routes.some(function (route) {
    var _routeType = _flowRuntime2.default.ref(RouteType);

    _flowRuntime2.default.param('route', _routeType).assert(route);

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
        var _paramNameType = _flowRuntime2.default.string();

        _flowRuntime2.default.param('paramName', _paramNameType).assert(paramName);

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

exports.default = function findMatch0(path, routes) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';

  var _pathType2 = _flowRuntime2.default.string();

  var _routesType2 = _flowRuntime2.default.ref(RoutesType);

  var _localeType2 = _flowRuntime2.default.ref(LocaleType);

  var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

  _flowRuntime2.default.param('path', _pathType2).assert(path);

  _flowRuntime2.default.param('routes', _routesType2).assert(routes);

  _flowRuntime2.default.param('locale', _localeType2).assert(locale);

  return _returnType2.assert(findMatch(path, path, routes, locale));
};
//# sourceMappingURL=findMatch.js.map
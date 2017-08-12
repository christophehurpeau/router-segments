'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _types = require('../types');

var _routes = require('../routes');

var _findMatch = require('./findMatch');

var _findMatch2 = _interopRequireDefault(_findMatch);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EndRouteType = _flowRuntime2.default.tdz(function () {
  return _routes.EndRouteType;
});

var RoutesType = _flowRuntime2.default.tdz(function () {
  return _types.RoutesType;
});

var RouteMapType = _flowRuntime2.default.tdz(function () {
  return _types.RouteMapType;
});

var RouterType = _flowRuntime2.default.tdz(function () {
  return _types.RouterType;
});

var RouteMatchType = _flowRuntime2.default.tdz(function () {
  return _types.RouteMatchType;
});

exports.default = function createRouter(routes, routeMap) {
  var _routesType = _flowRuntime2.default.ref(RoutesType);

  var _routeMapType = _flowRuntime2.default.ref(RouteMapType);

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RouterType));

  _flowRuntime2.default.param('routes', _routesType).assert(routes);

  _flowRuntime2.default.param('routeMap', _routeMapType).assert(routeMap);

  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var _routeKeyType = _flowRuntime2.default.string();

    _flowRuntime2.default.param('routeKey', _routeKeyType).assert(routeKey);

    var route = routeMap.get(routeKey);
    if (!route) throw new Error('No route named "' + routeKey + '"');
    return route;
  };

  return _returnType.assert({
    get: function get(key) {
      var _keyType = _flowRuntime2.default.string();

      var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(EndRouteType)));

      _flowRuntime2.default.param('key', _keyType).assert(key);

      return _returnType2.assert(getRequiredRoute(key));
    },
    find: function find(path, locale) {
      var _pathType = _flowRuntime2.default.string();

      var _localeType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

      _flowRuntime2.default.param('path', _pathType).assert(path);

      _flowRuntime2.default.param('locale', _localeType).assert(locale);

      return _returnType3.assert((0, _findMatch2.default)(path, routes, locale));
    },
    toPath: function toPath(key, args) {
      var _keyType2 = _flowRuntime2.default.string();

      var _argsType = _flowRuntime2.default.any();

      var _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.string());

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      _flowRuntime2.default.param('args', _argsType).assert(args);

      return _returnType4.assert(getRequiredRoute(key).getPath().toPath(args));
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      var _localeType2 = _flowRuntime2.default.string();

      var _keyType3 = _flowRuntime2.default.string();

      var _argsType2 = _flowRuntime2.default.any();

      var _returnType5 = _flowRuntime2.default.return(_flowRuntime2.default.string());

      _flowRuntime2.default.param('locale', _localeType2).assert(locale);

      _flowRuntime2.default.param('key', _keyType3).assert(key);

      _flowRuntime2.default.param('args', _argsType2).assert(args);

      return _returnType5.assert(getRequiredRoute(key).getPath(locale).toPath(args));
    }
  });
};
//# sourceMappingURL=createRouter.js.map
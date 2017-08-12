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

const EndRouteType = _flowRuntime2.default.tdz(() => _routes.EndRouteType);

const RoutesType = _flowRuntime2.default.tdz(() => _types.RoutesType);

const RouteMapType = _flowRuntime2.default.tdz(() => _types.RouteMapType);

const RouterType = _flowRuntime2.default.tdz(() => _types.RouterType);

const RouteMatchType = _flowRuntime2.default.tdz(() => _types.RouteMatchType);

exports.default = function createRouter(routes, routeMap) {
  let _routesType = _flowRuntime2.default.ref(RoutesType);

  let _routeMapType = _flowRuntime2.default.ref(RouteMapType);

  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RouterType));

  _flowRuntime2.default.param('routes', _routesType).assert(routes);

  _flowRuntime2.default.param('routeMap', _routeMapType).assert(routeMap);

  const getRequiredRoute = routeKey => {
    let _routeKeyType = _flowRuntime2.default.string();

    _flowRuntime2.default.param('routeKey', _routeKeyType).assert(routeKey);

    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return _returnType.assert({
    get: key => {
      let _keyType = _flowRuntime2.default.string();

      const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(EndRouteType)));

      _flowRuntime2.default.param('key', _keyType).assert(key);

      return _returnType2.assert(getRequiredRoute(key));
    },
    find: (path, locale) => {
      let _pathType = _flowRuntime2.default.string();

      let _localeType = _flowRuntime2.default.nullable(_flowRuntime2.default.string());

      const _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteMatchType)));

      _flowRuntime2.default.param('path', _pathType).assert(path);

      _flowRuntime2.default.param('locale', _localeType).assert(locale);

      return _returnType3.assert((0, _findMatch2.default)(path, routes, locale));
    },
    toPath: (key, args) => {
      let _keyType2 = _flowRuntime2.default.string();

      let _argsType = _flowRuntime2.default.any();

      const _returnType4 = _flowRuntime2.default.return(_flowRuntime2.default.string());

      _flowRuntime2.default.param('key', _keyType2).assert(key);

      _flowRuntime2.default.param('args', _argsType).assert(args);

      return _returnType4.assert(getRequiredRoute(key).getPath().toPath(args));
    },
    toLocalizedPath: (locale, key, args) => {
      let _localeType2 = _flowRuntime2.default.string();

      let _keyType3 = _flowRuntime2.default.string();

      let _argsType2 = _flowRuntime2.default.any();

      const _returnType5 = _flowRuntime2.default.return(_flowRuntime2.default.string());

      _flowRuntime2.default.param('locale', _localeType2).assert(locale);

      _flowRuntime2.default.param('key', _keyType3).assert(key);

      _flowRuntime2.default.param('args', _argsType2).assert(args);

      return _returnType5.assert(getRequiredRoute(key).getPath(locale).toPath(args));
    }
  });
};
//# sourceMappingURL=createRouter.js.map
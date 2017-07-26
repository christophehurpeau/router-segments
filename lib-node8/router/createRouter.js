'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findMatch = require('./findMatch');

var _findMatch2 = _interopRequireDefault(_findMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (routes, routeMap) => {
  const getRequiredRoute = routeKey => {
    const route = routeMap.get(routeKey);
    if (!route) throw new Error(`No route named "${routeKey}"`);
    return route;
  };

  return {
    get: key => getRequiredRoute(key),
    find: (path, locale) => (0, _findMatch2.default)(path, routes, locale),
    toPath: (key, args) => getRequiredRoute(key).getPath().toPath(args),
    toLocalizedPath: (locale, key, args) => getRequiredRoute(key).getPath(locale).toPath(args)
  };
};
//# sourceMappingURL=createRouter.js.map
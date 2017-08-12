'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _findMatch = require('./findMatch');

var _findMatch2 = _interopRequireDefault(_findMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (routes, routeMap) {
  var getRequiredRoute = function getRequiredRoute(routeKey) {
    var route = routeMap.get(routeKey);
    if (!route) throw new Error('No route named "' + routeKey + '"');
    return route;
  };

  return {
    get: function get(key) {
      return getRequiredRoute(key);
    },
    find: function find(path, locale) {
      return (0, _findMatch2.default)(path, routes, locale);
    },
    toPath: function toPath(key, args) {
      return getRequiredRoute(key).getPath().toPath(args);
    },
    toLocalizedPath: function toLocalizedPath(locale, key, args) {
      return getRequiredRoute(key).getPath(locale).toPath(args);
    }
  };
};
//# sourceMappingURL=createRouter.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoutePath = exports.createRoutePathSegment = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var keys = [];
  var regExp = (0, _pathToRegexp2.default)(segment ? path + '/(.+)?' : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return { path: path, completePath: completePath, regExp: regExp, namedParams: namedParams };

  return {
    path: path,
    completePath: completePath,
    regExp: regExp,
    namedParams: namedParams,
    toPath: _pathToRegexp2.default.compile(completePath)
  };
};

var createRoutePathSegment = exports.createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};

var createRoutePath = exports.createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};
//# sourceMappingURL=createRoutePath.js.map
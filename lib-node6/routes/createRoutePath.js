'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoutePath = exports.createRoutePathSegment = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const internalCreateRoutePath = (path, completePath, segment) => {
  const keys = [];
  const regExp = (0, _pathToRegexp2.default)(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: _pathToRegexp2.default.compile(completePath)
  };
};

const createRoutePathSegment = exports.createRoutePathSegment = (path, completePath) => internalCreateRoutePath(path, completePath, true);

const createRoutePath = exports.createRoutePath = (path, completePath) => internalCreateRoutePath(path, completePath, false);
//# sourceMappingURL=createRoutePath.js.map
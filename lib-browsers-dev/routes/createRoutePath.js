'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoutePath = exports.createRoutePathSegment = undefined;

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _types = require('../types');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SegmentRoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.SegmentRoutePathType;
});

var RoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.RoutePathType;
});

var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var _pathType = _flowRuntime2.default.string();

  var _completePathType = _flowRuntime2.default.string();

  var _segmentType = _flowRuntime2.default.boolean();

  var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.union(_flowRuntime2.default.ref(SegmentRoutePathType), _flowRuntime2.default.ref(RoutePathType)));

  _flowRuntime2.default.param('path', _pathType).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType).assert(completePath);

  _flowRuntime2.default.param('segment', _segmentType).assert(segment);

  var keys = [];
  var regExp = (0, _pathToRegexp2.default)(segment ? path + '/(.+)?' : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return _returnType.assert({ path: path, completePath: completePath, regExp: regExp, namedParams: namedParams });

  return _returnType.assert({
    path: path,
    completePath: completePath,
    regExp: regExp,
    namedParams: namedParams,
    toPath: _pathToRegexp2.default.compile(completePath)
  });
};

var createRoutePathSegment = exports.createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  var _pathType2 = _flowRuntime2.default.string();

  var _completePathType2 = _flowRuntime2.default.string();

  var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

  _flowRuntime2.default.param('path', _pathType2).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType2).assert(completePath);

  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
};

var createRoutePath = exports.createRoutePath = function createRoutePath(path, completePath) {
  var _pathType3 = _flowRuntime2.default.string();

  var _completePathType3 = _flowRuntime2.default.string();

  var _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

  _flowRuntime2.default.param('path', _pathType3).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType3).assert(completePath);

  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
};
//# sourceMappingURL=createRoutePath.js.map
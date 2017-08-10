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

const SegmentRoutePathType = _flowRuntime2.default.tdz(() => _types.SegmentRoutePathType);

const RoutePathType = _flowRuntime2.default.tdz(() => _types.RoutePathType);

const internalCreateRoutePath = _flowRuntime2.default.annotate(function internalCreateRoutePath(path, completePath, segment) {
  let _pathType = _flowRuntime2.default.string();

  let _completePathType = _flowRuntime2.default.string();

  let _segmentType = _flowRuntime2.default.boolean();

  const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.union(_flowRuntime2.default.ref(SegmentRoutePathType), _flowRuntime2.default.ref(RoutePathType)));

  _flowRuntime2.default.param('path', _pathType).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType).assert(completePath);

  _flowRuntime2.default.param('segment', _segmentType).assert(segment);

  const keys = [];
  const regExp = (0, _pathToRegexp2.default)(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);

  if (segment) return _returnType.assert({ path, completePath, regExp, namedParams });

  return _returnType.assert({
    path,
    completePath,
    regExp,
    namedParams,
    toPath: _pathToRegexp2.default.compile(completePath)
  });
}, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.param('segment', _flowRuntime2.default.boolean()), _flowRuntime2.default.return(_flowRuntime2.default.union(_flowRuntime2.default.ref(SegmentRoutePathType), _flowRuntime2.default.ref(RoutePathType)))));

const createRoutePathSegment = exports.createRoutePathSegment = _flowRuntime2.default.annotate(function createRoutePathSegment(path, completePath) {
  let _pathType2 = _flowRuntime2.default.string();

  let _completePathType2 = _flowRuntime2.default.string();

  const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

  _flowRuntime2.default.param('path', _pathType2).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType2).assert(completePath);

  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
}, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType))));

const createRoutePath = exports.createRoutePath = _flowRuntime2.default.annotate(function createRoutePath(path, completePath) {
  let _pathType3 = _flowRuntime2.default.string();

  let _completePathType3 = _flowRuntime2.default.string();

  const _returnType3 = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

  _flowRuntime2.default.param('path', _pathType3).assert(path);

  _flowRuntime2.default.param('completePath', _completePathType3).assert(completePath);

  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
}, _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType))));
//# sourceMappingURL=createRoutePath.js.map
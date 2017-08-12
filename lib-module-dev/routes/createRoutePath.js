import pathToRegExp from 'path-to-regexp';
import { SegmentRoutePathType as _SegmentRoutePathType, RoutePathType as _RoutePathType } from '../types';

import t from 'flow-runtime';
var SegmentRoutePathType = t.tdz(function () {
  return _SegmentRoutePathType;
});
var RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _segmentType = t.boolean();

  var _returnType = t.return(t.union(t.ref(SegmentRoutePathType), t.ref(RoutePathType)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('segment', _segmentType).assert(segment);

  var keys = [];
  var regExp = pathToRegExp(segment ? path + '/(.+)?' : path, keys, {
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
    toPath: pathToRegExp.compile(completePath)
  });
};

export var createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  var _pathType2 = t.string();

  var _completePathType2 = t.string();

  var _returnType2 = t.return(t.ref(RoutePathType));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);
  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
};

export var createRoutePath = function createRoutePath(path, completePath) {
  var _pathType3 = t.string();

  var _completePathType3 = t.string();

  var _returnType3 = t.return(t.ref(RoutePathType));

  t.param('path', _pathType3).assert(path);
  t.param('completePath', _completePathType3).assert(completePath);
  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
};
//# sourceMappingURL=createRoutePath.js.map
import pathToRegExp from 'path-to-regexp';
import { SegmentRoutePathType as _SegmentRoutePathType, RoutePathType as _RoutePathType } from '../types';

import t from 'flow-runtime';
const SegmentRoutePathType = t.tdz(() => _SegmentRoutePathType);
const RoutePathType = t.tdz(() => _RoutePathType);
const internalCreateRoutePath = t.annotate(function internalCreateRoutePath(path, completePath, segment) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _segmentType = t.boolean();

  const _returnType = t.return(t.union(t.ref(SegmentRoutePathType), t.ref(RoutePathType)));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('segment', _segmentType).assert(segment);

  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
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
    toPath: pathToRegExp.compile(completePath)
  });
}, t.function(t.param('path', t.string()), t.param('completePath', t.string()), t.param('segment', t.boolean()), t.return(t.union(t.ref(SegmentRoutePathType), t.ref(RoutePathType)))));

export const createRoutePathSegment = t.annotate(function createRoutePathSegment(path, completePath) {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType2 = t.return(t.ref(RoutePathType));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);
  return _returnType2.assert(internalCreateRoutePath(path, completePath, true));
}, t.function(t.param('path', t.string()), t.param('completePath', t.string()), t.return(t.ref(RoutePathType))));

export const createRoutePath = t.annotate(function createRoutePath(path, completePath) {
  let _pathType3 = t.string();

  let _completePathType3 = t.string();

  const _returnType3 = t.return(t.ref(RoutePathType));

  t.param('path', _pathType3).assert(path);
  t.param('completePath', _completePathType3).assert(completePath);
  return _returnType3.assert(internalCreateRoutePath(path, completePath, false));
}, t.function(t.param('path', t.string()), t.param('completePath', t.string()), t.return(t.ref(RoutePathType))));
//# sourceMappingURL=createRoutePath.js.map
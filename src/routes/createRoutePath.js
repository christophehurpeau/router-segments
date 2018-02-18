import pathToRegExp from 'path-to-regexp';
import type { SegmentRoutePathType, RoutePathType } from '../types';

const internalCreateRoutePath = (
  path: string,
  completePath: string,
  segment: boolean,
): SegmentRoutePathType | RoutePathType => {
  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}(.*)?` : path, keys, {
    sensitive: true,
    strict: true,
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath),
  };
};

export const createRoutePathSegment = (path: string, completePath: string): SegmentRoutePathType =>
  internalCreateRoutePath(path, completePath, true);

export const createRoutePath = (path: string, completePath: string): RoutePathType =>
  internalCreateRoutePath(path, completePath, false);

import type { Key } from 'path-to-regexp';
import pathToRegExp from 'path-to-regexp';
import type { SegmentRoutePath, EndRoutePath } from '../types';

function internalCreateRoutePath(
  path: string,
  completePath: string,
  segment: true,
): SegmentRoutePath;
function internalCreateRoutePath(
  path: string,
  completePath: string,
  segment: false,
): EndRoutePath;

function internalCreateRoutePath(
  path: string,
  completePath: string,
  segment: boolean,
): SegmentRoutePath | EndRoutePath {
  const keys: Key[] = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true,
  });
  const namedParams = keys.map((key) => key.name).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath),
  };
}

export const createRoutePathSegment = (
  path: string,
  completePath: string,
): SegmentRoutePath => internalCreateRoutePath(path, completePath, true);

export const createRoutePath = (
  path: string,
  completePath: string,
): EndRoutePath => internalCreateRoutePath(path, completePath, false);

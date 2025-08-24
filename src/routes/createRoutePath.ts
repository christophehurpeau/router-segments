import { compile, pathToRegexp } from "path-to-regexp";
import type { EndRoutePath, SegmentRoutePath } from "../types";

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
): EndRoutePath | SegmentRoutePath {
  const { keys, regexp: regExp } = pathToRegexp(path, {
    sensitive: true,
    trailing: false,
    end: !segment,
  });

  const namedParams = keys.map((key) => key.name).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: compile(completePath),
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

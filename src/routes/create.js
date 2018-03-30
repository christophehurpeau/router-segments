import type {
  LocaleType,
  PathDictionaryType,
  RoutePathType,
  SegmentRoutePathType,
  RouteRefType,
} from '../types';
import { createRoutePath, createRoutePathSegment } from './createRoutePath';
import Route from './EndRoute';
import LocalizedRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

const createLocalizedPaths = (
  pathDictionary: PathDictionaryType,
  completePathDictionary: PathDictionaryType,
  segment: boolean,
) => {
  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach((locale: LocaleType) => {
    const path = pathDictionary[locale];
    if (segment) {
      const routerPath: SegmentRoutePathType = createRoutePathSegment(
        path,
        completePathDictionary[locale],
      );
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath: RoutePathType = createRoutePath(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = (ref: any) => {
  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

export const createRoute = (path: string, completePath: string, ref: RouteRefType): Route => {
  /* istanbul ignore else */
  if (!PRODUCTION) checkRef(ref);
  const routePath: RoutePathType = createRoutePath(path, completePath);
  return new Route(routePath, ref);
};

export const createLocalizedRoute = (
  pathDictionary: PathDictionaryType,
  completePathDictionary: PathDictionaryType,
  ref: RouteRefType,
): LocalizedRoute => {
  /* istanbul ignore else */
  if (!PRODUCTION) checkRef(ref);
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new LocalizedRoute(localizedPaths, ref);
};

export const createSegmentRoute = (path: string, completePath: string): SegmentRoute => {
  const routePath = createRoutePathSegment(path, completePath);
  return new SegmentRoute(routePath);
};

export const createLocalizedSegmentRoute = (
  pathDictionary: PathDictionaryType,
  completePathDictionary: PathDictionaryType,
): LocalizedSegmentRoute => {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new LocalizedSegmentRoute(localizedPaths);
};

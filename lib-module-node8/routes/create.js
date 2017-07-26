import { createRoutePath, createRoutePathSegment } from './createRoutePath';

import Route from './EndRoute';
import LocalizedRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

const createLocalizedPaths = (pathDictionary, completePathDictionary, segment) => {
  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(locale => {
    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = createRoutePathSegment(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = createRoutePath(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = ref => {
  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

export const createRoute = (path, completePath, ref) => {
  const routePath = createRoutePath(path, completePath);
  return new Route(routePath, ref);
};

export const createLocalizedRoute = (pathDictionary, completePathDictionary, ref) => {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new LocalizedRoute(localizedPaths, ref);
};

export const createSegmentRoute = (path, completePath) => {
  const routePath = createRoutePathSegment(path, completePath);
  return new SegmentRoute(routePath);
};

export const createLocalizedSegmentRoute = (pathDictionary, completePathDictionary) => {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new LocalizedSegmentRoute(localizedPaths);
};
//# sourceMappingURL=create.js.map
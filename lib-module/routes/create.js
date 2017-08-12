import { createRoutePath, createRoutePathSegment } from './createRoutePath';

import Route from './EndRoute';
import LocalizedRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = createRoutePathSegment(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = createRoutePath(path, completePathDictionary[locale]);
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  if (!ref) throw new Error('Invalid ref: "' + ref + '"');
};

export var createRoute = function createRoute(path, completePath, ref) {
  var routePath = createRoutePath(path, completePath);
  return new Route(routePath, ref);
};

export var createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new LocalizedRoute(localizedPaths, ref);
};

export var createSegmentRoute = function createSegmentRoute(path, completePath) {
  var routePath = createRoutePathSegment(path, completePath);
  return new SegmentRoute(routePath);
};

export var createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new LocalizedSegmentRoute(localizedPaths);
};
//# sourceMappingURL=create.js.map
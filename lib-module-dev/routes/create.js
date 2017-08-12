import { createRoutePath, createRoutePathSegment } from './createRoutePath';
import { LocaleType as _LocaleType, PathDictionaryType as _PathDictionaryType, RoutePathType as _RoutePathType, SegmentRoutePathType as _SegmentRoutePathType, RouteRefType as _RouteRefType } from '../types';
import Route from './EndRoute';
import LocalizedRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

import t from 'flow-runtime';
var LocaleType = t.tdz(function () {
  return _LocaleType;
});
var PathDictionaryType = t.tdz(function () {
  return _PathDictionaryType;
});
var RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
var SegmentRoutePathType = t.tdz(function () {
  return _SegmentRoutePathType;
});
var RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var _pathDictionaryType = t.ref(PathDictionaryType);

  var _completePathDictionaryType = t.ref(PathDictionaryType);

  var _segmentType = t.boolean();

  t.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);
  t.param('segment', _segmentType).assert(segment);

  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var _localeType = t.ref(LocaleType);

    t.param('locale', _localeType).assert(locale);

    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = t.ref(SegmentRoutePathType).assert(createRoutePathSegment(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = t.ref(RoutePathType).assert(createRoutePath(path, completePathDictionary[locale]));
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  var _refType = t.any();

  t.param('ref', _refType).assert(ref);

  if (!ref) throw new Error('Invalid ref: "' + ref + '"');
};

export var createRoute = function createRoute(path, completePath, ref) {
  var _pathType = t.string();

  var _completePathType = t.string();

  var _refType2 = t.ref(RouteRefType);

  var _returnType = t.return(t.ref(Route));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var routePath = t.ref(RoutePathType).assert(createRoutePath(path, completePath));
  return _returnType.assert(new Route(routePath, ref));
};

export var createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var _pathDictionaryType2 = t.ref(PathDictionaryType);

  var _completePathDictionaryType2 = t.ref(PathDictionaryType);

  var _refType3 = t.ref(RouteRefType);

  var _returnType2 = t.return(t.ref(LocalizedRoute));

  t.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);
  t.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new LocalizedRoute(localizedPaths, ref));
};

export var createSegmentRoute = function createSegmentRoute(path, completePath) {
  var _pathType2 = t.string();

  var _completePathType2 = t.string();

  var _returnType3 = t.return(t.ref(SegmentRoute));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);

  var routePath = createRoutePathSegment(path, completePath);
  return _returnType3.assert(new SegmentRoute(routePath));
};

export var createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var _pathDictionaryType3 = t.ref(PathDictionaryType);

  var _completePathDictionaryType3 = t.ref(PathDictionaryType);

  var _returnType4 = t.return(t.ref(LocalizedSegmentRoute));

  t.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new LocalizedSegmentRoute(localizedPaths));
};
//# sourceMappingURL=create.js.map
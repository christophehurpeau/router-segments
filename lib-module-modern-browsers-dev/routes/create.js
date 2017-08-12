import { createRoutePath, createRoutePathSegment } from './createRoutePath';
import { LocaleType as _LocaleType, PathDictionaryType as _PathDictionaryType, RoutePathType as _RoutePathType, SegmentRoutePathType as _SegmentRoutePathType, RouteRefType as _RouteRefType } from '../types';
import Route from './EndRoute';
import LocalizedRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

import t from 'flow-runtime';
const LocaleType = t.tdz(function () {
  return _LocaleType;
});
const PathDictionaryType = t.tdz(function () {
  return _PathDictionaryType;
});
const RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
const SegmentRoutePathType = t.tdz(function () {
  return _SegmentRoutePathType;
});
const RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
const createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  let _pathDictionaryType = t.ref(PathDictionaryType);

  let _completePathDictionaryType = t.ref(PathDictionaryType);

  let _segmentType = t.boolean();

  t.param('pathDictionary', _pathDictionaryType).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType).assert(completePathDictionary);
  t.param('segment', _segmentType).assert(segment);

  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    let _localeType = t.ref(LocaleType);

    t.param('locale', _localeType).assert(locale);

    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = t.ref(SegmentRoutePathType).assert(createRoutePathSegment(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = t.ref(RoutePathType).assert(createRoutePath(path, completePathDictionary[locale]));
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = function checkRef(ref) {
  let _refType = t.any();

  t.param('ref', _refType).assert(ref);

  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

export const createRoute = function createRoute(path, completePath, ref) {
  let _pathType = t.string();

  let _completePathType = t.string();

  let _refType2 = t.ref(RouteRefType);

  const _returnType = t.return(t.ref(Route));

  t.param('path', _pathType).assert(path);
  t.param('completePath', _completePathType).assert(completePath);
  t.param('ref', _refType2).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const routePath = t.ref(RoutePathType).assert(createRoutePath(path, completePath));
  return _returnType.assert(new Route(routePath, ref));
};

export const createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  let _pathDictionaryType2 = t.ref(PathDictionaryType);

  let _completePathDictionaryType2 = t.ref(PathDictionaryType);

  let _refType3 = t.ref(RouteRefType);

  const _returnType2 = t.return(t.ref(LocalizedRoute));

  t.param('pathDictionary', _pathDictionaryType2).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType2).assert(completePathDictionary);
  t.param('ref', _refType3).assert(ref);

  /* istanbul ignore else */
  checkRef(ref);
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return _returnType2.assert(new LocalizedRoute(localizedPaths, ref));
};

export const createSegmentRoute = function createSegmentRoute(path, completePath) {
  let _pathType2 = t.string();

  let _completePathType2 = t.string();

  const _returnType3 = t.return(t.ref(SegmentRoute));

  t.param('path', _pathType2).assert(path);
  t.param('completePath', _completePathType2).assert(completePath);

  const routePath = createRoutePathSegment(path, completePath);
  return _returnType3.assert(new SegmentRoute(routePath));
};

export const createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  let _pathDictionaryType3 = t.ref(PathDictionaryType);

  let _completePathDictionaryType3 = t.ref(PathDictionaryType);

  const _returnType4 = t.return(t.ref(LocalizedSegmentRoute));

  t.param('pathDictionary', _pathDictionaryType3).assert(pathDictionary);
  t.param('completePathDictionary', _completePathDictionaryType3).assert(completePathDictionary);

  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return _returnType4.assert(new LocalizedSegmentRoute(localizedPaths));
};
//# sourceMappingURL=create.js.map
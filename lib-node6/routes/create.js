'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLocalizedSegmentRoute = exports.createSegmentRoute = exports.createLocalizedRoute = exports.createRoute = undefined;

var _createRoutePath = require('./createRoutePath');

var _EndRoute = require('./EndRoute');

var _EndRoute2 = _interopRequireDefault(_EndRoute);

var _LocalizedEndRoute = require('./LocalizedEndRoute');

var _LocalizedEndRoute2 = _interopRequireDefault(_LocalizedEndRoute);

var _SegmentRoute = require('./SegmentRoute');

var _SegmentRoute2 = _interopRequireDefault(_SegmentRoute);

var _LocalizedSegmentRoute = require('./LocalizedSegmentRoute');

var _LocalizedSegmentRoute2 = _interopRequireDefault(_LocalizedSegmentRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createLocalizedPaths = (pathDictionary, completePathDictionary, segment) => {
  const localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(locale => {
    const path = pathDictionary[locale];
    if (segment) {
      const routerPath = (0, _createRoutePath.createRoutePathSegment)(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      const routerPath = (0, _createRoutePath.createRoutePath)(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    }
  });
  return localizedPaths;
};

const checkRef = ref => {
  if (!ref) throw new Error(`Invalid ref: "${ref}"`);
};

const createRoute = exports.createRoute = (path, completePath, ref) => {
  const routePath = (0, _createRoutePath.createRoutePath)(path, completePath);
  return new _EndRoute2.default(routePath, ref);
};

const createLocalizedRoute = exports.createLocalizedRoute = (pathDictionary, completePathDictionary, ref) => {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new _LocalizedEndRoute2.default(localizedPaths, ref);
};

const createSegmentRoute = exports.createSegmentRoute = (path, completePath) => {
  const routePath = (0, _createRoutePath.createRoutePathSegment)(path, completePath);
  return new _SegmentRoute2.default(routePath);
};

const createLocalizedSegmentRoute = exports.createLocalizedSegmentRoute = (pathDictionary, completePathDictionary) => {
  const localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new _LocalizedSegmentRoute2.default(localizedPaths);
};
//# sourceMappingURL=create.js.map
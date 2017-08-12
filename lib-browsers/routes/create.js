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

var createLocalizedPaths = function createLocalizedPaths(pathDictionary, completePathDictionary, segment) {
  var localizedPaths = new Map();
  Object.keys(pathDictionary).forEach(function (locale) {
    var path = pathDictionary[locale];
    if (segment) {
      var routerPath = (0, _createRoutePath.createRoutePathSegment)(path, completePathDictionary[locale]);
      localizedPaths.set(locale, routerPath);
    } else {
      var _routerPath = (0, _createRoutePath.createRoutePath)(path, completePathDictionary[locale]);
      localizedPaths.set(locale, _routerPath);
    }
  });
  return localizedPaths;
};

var checkRef = function checkRef(ref) {
  if (!ref) throw new Error('Invalid ref: "' + ref + '"');
};

var createRoute = exports.createRoute = function createRoute(path, completePath, ref) {
  var routePath = (0, _createRoutePath.createRoutePath)(path, completePath);
  return new _EndRoute2.default(routePath, ref);
};

var createLocalizedRoute = exports.createLocalizedRoute = function createLocalizedRoute(pathDictionary, completePathDictionary, ref) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, false);
  return new _LocalizedEndRoute2.default(localizedPaths, ref);
};

var createSegmentRoute = exports.createSegmentRoute = function createSegmentRoute(path, completePath) {
  var routePath = (0, _createRoutePath.createRoutePathSegment)(path, completePath);
  return new _SegmentRoute2.default(routePath);
};

var createLocalizedSegmentRoute = exports.createLocalizedSegmentRoute = function createLocalizedSegmentRoute(pathDictionary, completePathDictionary) {
  var localizedPaths = createLocalizedPaths(pathDictionary, completePathDictionary, true);
  return new _LocalizedSegmentRoute2.default(localizedPaths);
};
//# sourceMappingURL=create.js.map
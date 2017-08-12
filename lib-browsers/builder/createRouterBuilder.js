'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('../routes/create');

var _createRouter2 = require('../router/createRouter');

var _createRouter3 = _interopRequireDefault(_createRouter2);

var _createSegmentRouterBuilderCreator = require('./createSegmentRouterBuilderCreator');

var _createSegmentRouterBuilderCreator2 = _interopRequireDefault(_createSegmentRouterBuilderCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (locales) {
  var defaultLocale = locales && locales[0];
  var routes = [];
  var routeMap = new Map();

  var addToRouteMap = function addToRouteMap(key, route) {
    if (routeMap.has(key)) throw new Error('"' + key + '" is already used');
    routeMap.set(key, route);
  };

  var createSegmentRouterBuilder = (0, _createSegmentRouterBuilderCreator2.default)(defaultLocale, addToRouteMap);

  return {
    add: function add(path, ref, key) {
      var route = (0, _create.createRoute)(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: function addLocalized(localizedPaths, ref, key) {
      if (!defaultLocale) throw new Error('Invalid locales');
      var route = (0, _create.createLocalizedRoute)(localizedPaths, localizedPaths, ref);
      routes.push(route);
      var finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: function addSegment(path, buildSegment) {
      var route = (0, _create.createSegmentRoute)(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
      if (!defaultLocale) throw new Error('Invalid locales');
      var route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: function getRoutes() {
      return routes;
    },
    createRouter: function createRouter() {
      return (0, _createRouter3.default)(routes, routeMap);
    }
  };
};
//# sourceMappingURL=createRouterBuilder.js.map
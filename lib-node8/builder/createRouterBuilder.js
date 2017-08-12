'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _create = require('../routes/create');

var _createRouter = require('../router/createRouter');

var _createRouter2 = _interopRequireDefault(_createRouter);

var _createSegmentRouterBuilderCreator = require('./createSegmentRouterBuilderCreator');

var _createSegmentRouterBuilderCreator2 = _interopRequireDefault(_createSegmentRouterBuilderCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = locales => {
  const defaultLocale = locales && locales[0];
  const routes = [];
  const routeMap = new Map();

  const addToRouteMap = (key, route) => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = (0, _createSegmentRouterBuilderCreator2.default)(defaultLocale, addToRouteMap);

  return {
    add: (path, ref, key) => {
      const route = (0, _create.createRoute)(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: (localizedPaths, ref, key) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = (0, _create.createLocalizedRoute)(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: (path, buildSegment) => {
      const route = (0, _create.createSegmentRoute)(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: (localizedPaths, buildSegment) => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = (0, _create.createLocalizedSegmentRoute)(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: () => routes,
    createRouter: () => (0, _createRouter2.default)(routes, routeMap)
  };
};
//# sourceMappingURL=createRouterBuilder.js.map
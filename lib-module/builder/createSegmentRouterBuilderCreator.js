
import { createRoute, createLocalizedRoute, createSegmentRoute, createLocalizedSegmentRoute } from '../routes/create';

export default (function (defaultLocale, addToRouteMap) {
  var createSegmentRouterBuilder = function createSegmentRouterBuilder(segmentRoute) {
    var getCompletePath = function getCompletePath(path) {
      return segmentRoute.path.completePath + path;
    };
    var getCompleteLocalizedPaths = function getCompleteLocalizedPaths(localizedPaths) {
      var completeLocalizedPaths = {};

      var getCompletePathForLocale = !segmentRoute.localizedPaths ? function (path) {
        return '' + segmentRoute.path.completePath + path;
      } : function (path, locale) {
        return '' + segmentRoute.localizedPaths.get(locale).completePath + path;
      };

      Object.keys(localizedPaths).forEach(function (locale) {
        completeLocalizedPaths[locale] = getCompletePathForLocale(localizedPaths[locale], locale);
      });

      return completeLocalizedPaths;
    };

    var createLocalizedPathFromSegment = function createLocalizedPathFromSegment(path) {
      var localizedPaths = {};
      Array.from(segmentRoute.localizedPaths.keys()).forEach(function (locale) {
        return localizedPaths[locale] = path;
      });
      return localizedPaths;
    };

    var _createLocalizedEndRoute = function _createLocalizedEndRoute(localizedPaths, ref, key) {
      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var finalKey = key || completeLocalizedPaths[defaultLocale];
      var route = createLocalizedRoute(localizedPaths, completeLocalizedPaths, ref);
      addToRouteMap(finalKey, route);
      return route;
    };

    var _createEndRoute = function _createEndRoute(path, ref, key) {
      if (segmentRoute.localizedPaths) {
        return _createLocalizedEndRoute(createLocalizedPathFromSegment(path), ref, key);
      }

      var completePath = getCompletePath(path);
      var route = createRoute(path, completePath, ref);

      addToRouteMap(key || completePath, route);
      return route;
    };

    var _createLocalizedSegmentRoute = function _createLocalizedSegmentRoute(localizedPaths, buildSegment) {
      var completeLocalizedPaths = getCompleteLocalizedPaths(localizedPaths);
      var route = createLocalizedSegmentRoute(localizedPaths, completeLocalizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    var _createSegmentRoute = function _createSegmentRoute(path, buildSegment) {
      if (segmentRoute.localizedPaths) {
        return _createLocalizedSegmentRoute(createLocalizedPathFromSegment(path), buildSegment);
      }

      var completePath = getCompletePath(path);
      var route = createSegmentRoute(path, completePath);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      return route;
    };

    return {
      defaultRoute: function defaultRoute(ref, key) {
        segmentRoute.defaultRoute = _createEndRoute('', ref, key);
      },

      add: function add(path, ref, key) {
        segmentRoute.nestedRoutes.push(_createEndRoute(path, ref, key));
      },

      addLocalized: function addLocalized(localizedPaths, ref, key) {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedEndRoute(localizedPaths, ref, key));
      },

      addSegment: function addSegment(path, buildSegment) {
        segmentRoute.nestedRoutes.push(_createSegmentRoute(path, buildSegment));
      },

      addLocalizedSegment: function addLocalizedSegment(localizedPaths, buildSegment) {
        if (!defaultLocale) throw new Error('Invalid locales');
        segmentRoute.nestedRoutes.push(_createLocalizedSegmentRoute(localizedPaths, buildSegment));
      }
    };
  };
  return createSegmentRouterBuilder;
});
//# sourceMappingURL=createSegmentRouterBuilderCreator.js.map
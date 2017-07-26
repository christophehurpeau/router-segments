'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterBuilderType = exports.RouterType = exports.RouteMatchType = exports.RouteMapType = exports.RoutesType = exports.RoutePathType = exports.SegmentRoutePathType = exports.SegmentCallbackType = exports.SegmentRouterBuilderType = exports.RouteRefType = exports.PathDictionaryType = exports.LocaleType = exports.RouteType = undefined;

var _routes = require('./routes');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteType = _flowRuntime2.default.tdz(() => _routes.RouteType);

exports.RouteType = RouteType;

const LocaleType = exports.LocaleType = _flowRuntime2.default.type('LocaleType', _flowRuntime2.default.string());

const PathDictionaryType = exports.PathDictionaryType = _flowRuntime2.default.type('PathDictionaryType', _flowRuntime2.default.object(_flowRuntime2.default.indexer('key', LocaleType, _flowRuntime2.default.string())));

const RouteRefType = exports.RouteRefType = _flowRuntime2.default.type('RouteRefType', _flowRuntime2.default.any());

const SegmentRouterBuilderType = exports.SegmentRouterBuilderType = _flowRuntime2.default.type('SegmentRouterBuilderType', SegmentRouterBuilderType => {
  return _flowRuntime2.default.exactObject(_flowRuntime2.default.property('defaultRoute', _flowRuntime2.default.function(_flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('add', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addLocalized', _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPath', PathDictionaryType), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addSegment', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('buildSegment', SegmentRouterBuilderType), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addLocalizedSegment', _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPath', PathDictionaryType), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))));
});

const SegmentCallbackType = exports.SegmentCallbackType = _flowRuntime2.default.type('SegmentCallbackType', _flowRuntime2.default.function(_flowRuntime2.default.param('builder', SegmentRouterBuilderType), _flowRuntime2.default.return(_flowRuntime2.default.void())));

const SegmentRoutePathType = exports.SegmentRoutePathType = _flowRuntime2.default.type('SegmentRoutePathType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('path', _flowRuntime2.default.string()), _flowRuntime2.default.property('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.property('regExp', _flowRuntime2.default.ref('RegExp')), _flowRuntime2.default.property('namedParams', _flowRuntime2.default.array(_flowRuntime2.default.string()))));

const RoutePathType = exports.RoutePathType = _flowRuntime2.default.type('RoutePathType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('path', _flowRuntime2.default.string()), _flowRuntime2.default.property('completePath', _flowRuntime2.default.string()), _flowRuntime2.default.property('regExp', _flowRuntime2.default.ref('RegExp')), _flowRuntime2.default.property('namedParams', _flowRuntime2.default.array(_flowRuntime2.default.string())), _flowRuntime2.default.property('toPath', _flowRuntime2.default.function(_flowRuntime2.default.param('args', _flowRuntime2.default.object()), _flowRuntime2.default.return(_flowRuntime2.default.string())))));

const RoutesType = exports.RoutesType = _flowRuntime2.default.type('RoutesType', _flowRuntime2.default.array(_flowRuntime2.default.ref(RouteType)));

const RouteMapType = exports.RouteMapType = _flowRuntime2.default.type('RouteMapType', _flowRuntime2.default.ref('Map', _flowRuntime2.default.string(), _flowRuntime2.default.ref(RouteType)));

const RouteMatchType = exports.RouteMatchType = _flowRuntime2.default.type('RouteMatchType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('ref', RouteRefType), _flowRuntime2.default.property('path', _flowRuntime2.default.string()), _flowRuntime2.default.property('route', _flowRuntime2.default.ref(RouteType)), _flowRuntime2.default.property('routePath', RoutePathType), _flowRuntime2.default.property('namedParams', _flowRuntime2.default.nullable(_flowRuntime2.default.ref('Map', _flowRuntime2.default.string(), _flowRuntime2.default.string()))), _flowRuntime2.default.property('otherParams', _flowRuntime2.default.nullable(_flowRuntime2.default.array(_flowRuntime2.default.string())))));

const RouterType = exports.RouterType = _flowRuntime2.default.type('RouterType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('get', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RouteType))))), _flowRuntime2.default.property('find', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.return(_flowRuntime2.default.nullable(RouteMatchType)))), _flowRuntime2.default.property('toPath', _flowRuntime2.default.function(_flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('args', _flowRuntime2.default.any()), _flowRuntime2.default.return(_flowRuntime2.default.string()))), _flowRuntime2.default.property('toLocalizedPath', _flowRuntime2.default.function(_flowRuntime2.default.param('locale', _flowRuntime2.default.string()), _flowRuntime2.default.param('key', _flowRuntime2.default.string()), _flowRuntime2.default.param('args', _flowRuntime2.default.any()), _flowRuntime2.default.return(_flowRuntime2.default.string())))));

const RouterBuilderType = exports.RouterBuilderType = _flowRuntime2.default.type('RouterBuilderType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('add', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addLocalized', _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPath', PathDictionaryType), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addSegment', _flowRuntime2.default.function(_flowRuntime2.default.param('path', _flowRuntime2.default.string()), _flowRuntime2.default.param('buildSegment', SegmentRouterBuilderType), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('addLocalizedSegment', _flowRuntime2.default.function(_flowRuntime2.default.param('localizedPath', PathDictionaryType), _flowRuntime2.default.param('ref', RouteRefType), _flowRuntime2.default.param('key', _flowRuntime2.default.nullable(_flowRuntime2.default.string())), _flowRuntime2.default.return(_flowRuntime2.default.void()))), _flowRuntime2.default.property('getRoutes', _flowRuntime2.default.function(_flowRuntime2.default.return(RoutesType))), _flowRuntime2.default.property('createRouter', _flowRuntime2.default.function(_flowRuntime2.default.return(RouterType)))));
//# sourceMappingURL=types.js.map
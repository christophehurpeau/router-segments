import { RouteType as _RouteType, EndRouteType as _EndRouteType } from './routes';

import t from 'flow-runtime';
const RouteType = t.tdz(() => _RouteType);
const EndRouteType = t.tdz(() => _EndRouteType);
export { RouteType };

export const LocaleType = t.type('LocaleType', t.string());

export const PathDictionaryType = t.type('PathDictionaryType', t.object(t.indexer('key', LocaleType, t.string())));

export const RouteRefType = t.type('RouteRefType', t.any());

export const SegmentRouterBuilderType = t.type('SegmentRouterBuilderType', SegmentRouterBuilderType => {
  return t.exactObject(t.property('defaultRoute', t.function(t.param('ref', RouteRefType), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('add', t.function(t.param('path', t.string()), t.param('ref', RouteRefType), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', RouteRefType), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))));
});

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export const SegmentRoutePathType = t.type('SegmentRoutePathType', t.exactObject(t.property('path', t.string()), t.property('completePath', t.string()), t.property('regExp', t.ref('RegExp')), t.property('namedParams', t.array(t.string()))));

export const RoutePathType = t.type('RoutePathType', t.exactObject(t.property('path', t.string()), t.property('completePath', t.string()), t.property('regExp', t.ref('RegExp')), t.property('namedParams', t.array(t.string())), t.property('toPath', t.function(t.param('args', t.object()), t.return(t.string())))));

export const RoutesType = t.type('RoutesType', t.array(t.ref(RouteType)));
export const RouteMapType = t.type('RouteMapType', t.ref('Map', t.string(), t.ref(RouteType)));

export const RouteMatchType = t.type('RouteMatchType', t.exactObject(t.property('ref', RouteRefType), t.property('path', t.string()), t.property('route', t.ref(RouteType)), t.property('routePath', RoutePathType), t.property('namedParams', t.nullable(t.ref('Map', t.string(), t.string()))), t.property('otherParams', t.nullable(t.array(t.string())))));

export const RouterType = t.type('RouterType', t.exactObject(t.property('get', t.function(t.param('key', t.string()), t.return(t.nullable(t.ref(EndRouteType))))), t.property('find', t.function(t.param('path', t.string()), t.param('locale', t.nullable(t.string())), t.return(t.nullable(RouteMatchType)))), t.property('toPath', t.function(t.param('key', t.string()), t.param('args', t.any()), t.return(t.string()))), t.property('toLocalizedPath', t.function(t.param('locale', t.string()), t.param('key', t.string()), t.param('args', t.any()), t.return(t.string())))));

export const RouterBuilderType = t.type('RouterBuilderType', t.exactObject(t.property('add', t.function(t.param('path', t.string()), t.param('ref', RouteRefType), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addLocalized', t.function(t.param('localizedPaths', PathDictionaryType), t.param('ref', RouteRefType), t.param('key', t.nullable(t.string())), t.return(t.void()))), t.property('addSegment', t.function(t.param('path', t.string()), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('addLocalizedSegment', t.function(t.param('localizedPaths', PathDictionaryType), t.param('buildSegment', t.function(t.param('builder', SegmentRouterBuilderType), t.return(t.void()))), t.return(t.void()))), t.property('getRoutes', t.function(t.return(RoutesType))), t.property('createRouter', t.function(t.return(RouterType)))));
//# sourceMappingURL=types.js.map
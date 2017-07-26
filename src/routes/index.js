import EndRoute from './EndRoute';
import LocalizedEndRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

export type RouteType = EndRoute | LocalizedEndRoute | SegmentRoute | LocalizedSegmentRoute;
export type SegmentRouteType = SegmentRoute | LocalizedSegmentRoute;
export type EndRouteType = EndRoute | LocalizedEndRoute;

export { EndRoute, LocalizedEndRoute, SegmentRoute, LocalizedSegmentRoute };

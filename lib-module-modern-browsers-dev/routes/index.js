import EndRoute from './EndRoute';
import LocalizedEndRoute from './LocalizedEndRoute';
import SegmentRoute from './SegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';

import t from 'flow-runtime';
export const RouteType = t.type('RouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute), t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
export const SegmentRouteType = t.type('SegmentRouteType', t.union(t.ref(SegmentRoute), t.ref(LocalizedSegmentRoute)));
export const EndRouteType = t.type('EndRouteType', t.union(t.ref(EndRoute), t.ref(LocalizedEndRoute)));

export { EndRoute, LocalizedEndRoute, SegmentRoute, LocalizedSegmentRoute };
//# sourceMappingURL=index.js.map
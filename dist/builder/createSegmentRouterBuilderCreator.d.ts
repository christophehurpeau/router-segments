import { LocalizedPathsRecord, RouteRef, LocaleType } from '../types';
import { EndRoute, SegmentRoute } from '../routes/interfaces';
export interface SegmentRouterBuilder<Locales extends LocaleType> {
    add(path: string, ref: RouteRef, key?: string): void;
    addLocalized(localizedPaths: LocalizedPathsRecord<Locales>, ref: RouteRef, key?: string): void;
    addLocalizedSegment(localizedPaths: LocalizedPathsRecord<Locales>, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void): void;
    addSegment(path: string, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void): void;
    defaultRoute(ref: RouteRef, key?: string): void;
}
declare const _default: <Locales extends string>(defaultLocale: Locales | undefined, addToRouteMap: (key: string, route: EndRoute<Locales>) => void) => (segmentRoute: SegmentRoute<Locales>) => SegmentRouterBuilder<Locales>;
export default _default;
//# sourceMappingURL=createSegmentRouterBuilderCreator.d.ts.map
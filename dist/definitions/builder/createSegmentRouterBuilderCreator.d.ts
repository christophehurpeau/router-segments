import type { EndRoute, SegmentRoute } from "../routes/interfaces";
import type { LocaleType, LocalizedPathsRecord } from "../types";
export interface SegmentRouterBuilder<Locales extends LocaleType, RouteRef> {
    add: (path: string, ref: RouteRef, key?: string) => void;
    addLocalized: (localizedPaths: LocalizedPathsRecord<Locales>, ref: RouteRef, key?: string) => void;
    addLocalizedSegment: (localizedPaths: LocalizedPathsRecord<Locales>, buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void) => void;
    addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void) => void;
    defaultRoute: (ref: RouteRef, key?: string) => void;
}
export declare function createSegmentRouterBuilderCreator<Locales extends LocaleType, RouteRef>(defaultLocale: Locales | undefined, addToRouteMap: (key: string, route: EndRoute<Locales, RouteRef>) => void): (segmentRoute: SegmentRoute<Locales, RouteRef>) => SegmentRouterBuilder<Locales, RouteRef>;
//# sourceMappingURL=createSegmentRouterBuilderCreator.d.ts.map
import type { LocalizedEndRoute } from "./LocalizedEndRoute";
import type { SegmentRoute, LocalizedRoute } from "./interfaces";
import type { LocaleType, SegmentRoutePath } from "./types";
export declare class LocalizedSegmentRoute<Locales extends LocaleType, RouteRef> implements SegmentRoute<Locales, RouteRef>, LocalizedRoute<SegmentRoutePath, Locales, RouteRef> {
    localizedPaths: Map<Locales, SegmentRoutePath>;
    nestedRoutes: LocalizedRoute<any, Locales, RouteRef>[];
    defaultRoute: LocalizedEndRoute<Locales, RouteRef> | undefined;
    constructor(localizedPaths: Map<Locales, SegmentRoutePath>);
    freeze(): void;
    getPath(locale?: Locales): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): true;
    toJSON(): unknown[];
    toString(): string;
}
//# sourceMappingURL=LocalizedSegmentRoute.d.ts.map
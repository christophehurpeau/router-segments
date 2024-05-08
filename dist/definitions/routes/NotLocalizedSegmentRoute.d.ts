import type { NotLocalizedEndRoute } from "./NotLocalizedEndRoute";
import type { SegmentRoute, NotLocalizedRoute } from "./interfaces";
import type { LocaleType, SegmentRoutePath } from "./types";
export declare class NotLocalizedSegmentRoute<Locales extends LocaleType, RouteRef> implements SegmentRoute<Locales, RouteRef>, NotLocalizedRoute<SegmentRoutePath, Locales, RouteRef> {
    path: SegmentRoutePath;
    nestedRoutes: NotLocalizedRoute<any, Locales, RouteRef>[];
    defaultRoute: NotLocalizedEndRoute<Locales, RouteRef> | undefined;
    constructor(path: SegmentRoutePath);
    freeze(): void;
    getPath(): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): false;
    toJSON(): unknown;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedSegmentRoute.d.ts.map
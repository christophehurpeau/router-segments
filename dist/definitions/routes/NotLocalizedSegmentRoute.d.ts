import type { NotLocalizedEndRoute } from './NotLocalizedEndRoute';
import type { SegmentRoute, NotLocalizedRoute } from './interfaces';
import type { LocaleType, SegmentRoutePath } from './types';
export declare class NotLocalizedSegmentRoute<Locales extends LocaleType = LocaleType> implements SegmentRoute<Locales>, NotLocalizedRoute<SegmentRoutePath, Locales> {
    path: SegmentRoutePath;
    nestedRoutes: NotLocalizedRoute<any, Locales>[];
    defaultRoute: NotLocalizedEndRoute | undefined;
    constructor(path: SegmentRoutePath);
    freeze(): void;
    getPath(): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): false;
    toJSON(): unknown;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedSegmentRoute.d.ts.map
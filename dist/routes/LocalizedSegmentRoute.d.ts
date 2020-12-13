import type LocalizedEndRoute from './LocalizedEndRoute';
import type { SegmentRoute, LocalizedRoute } from './interfaces';
import type { LocaleType, SegmentRoutePath } from './types';
export default class LocalizedSegmentRoute<Locales extends LocaleType> implements SegmentRoute<Locales>, LocalizedRoute<SegmentRoutePath, Locales> {
    localizedPaths: Map<Locales, SegmentRoutePath>;
    nestedRoutes: LocalizedRoute<any, Locales>[];
    defaultRoute: undefined | LocalizedEndRoute<Locales>;
    constructor(localizedPaths: Map<Locales, SegmentRoutePath>);
    freeze(): void;
    getPath(locale?: Locales): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): true;
    toJSON(): unknown[];
    toString(): string;
}
//# sourceMappingURL=LocalizedSegmentRoute.d.ts.map
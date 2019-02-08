import LocalizedEndRoute from './LocalizedEndRoute';
import { LocaleType, SegmentRoutePath } from './types';
import { SegmentRoute, LocalizedRoute } from './interfaces';
export default class LocalizedSegmentRoute<Locales extends LocaleType> implements SegmentRoute, LocalizedRoute<SegmentRoutePath, Locales> {
    localizedPaths: Map<Locales, SegmentRoutePath>;
    nestedRoutes: LocalizedRoute<any, Locales>[];
    defaultRoute: undefined | LocalizedEndRoute<Locales>;
    constructor(localizedPaths: Map<Locales, SegmentRoutePath>);
    freeze(): void;
    getPath(locale: Locales): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): true;
    toJSON(): [Locales, SegmentRoutePath][];
    toString(): string;
}
//# sourceMappingURL=LocalizedSegmentRoute.d.ts.map
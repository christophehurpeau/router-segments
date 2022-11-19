import type { EndRoute, LocalizedRoute } from './interfaces';
import type { LocaleType, EndRoutePath, RouteRef } from './types';
export declare class LocalizedEndRoute<Locales extends LocaleType> implements EndRoute<Locales>, LocalizedRoute<EndRoutePath, Locales> {
    localizedPaths: Map<LocaleType, EndRoutePath>;
    ref: RouteRef;
    constructor(localizedPaths: Map<LocaleType, EndRoutePath>, ref: RouteRef);
    getPath(locale?: Locales): EndRoutePath;
    isSegment(): false;
    isLocalized(): true;
    toJSON(): unknown[];
    toString(): string;
}
//# sourceMappingURL=LocalizedEndRoute.d.ts.map
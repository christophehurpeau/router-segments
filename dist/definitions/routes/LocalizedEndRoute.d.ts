import type { EndRoute, LocalizedRoute } from "./interfaces";
import type { LocaleType, EndRoutePath } from "./types";
export declare class LocalizedEndRoute<Locales extends LocaleType, RouteRef> implements EndRoute<Locales, RouteRef>, LocalizedRoute<EndRoutePath, Locales, RouteRef> {
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
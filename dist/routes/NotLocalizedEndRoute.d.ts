import type { EndRoute, NotLocalizedRoute } from './interfaces';
import type { EndRoutePath, LocaleType, RouteRef } from './types';
export declare class NotLocalizedEndRoute<Locales extends LocaleType = LocaleType> implements EndRoute<Locales>, NotLocalizedRoute<EndRoutePath, Locales> {
    path: EndRoutePath;
    ref: RouteRef;
    constructor(path: EndRoutePath, ref: RouteRef);
    getPath(): EndRoutePath;
    isSegment(): false;
    isLocalized(): false;
    toJSON(): unknown;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedEndRoute.d.ts.map
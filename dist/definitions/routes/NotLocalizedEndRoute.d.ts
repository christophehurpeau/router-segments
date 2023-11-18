import type { EndRoute, NotLocalizedRoute } from './interfaces';
import type { EndRoutePath, LocaleType } from './types';
export declare class NotLocalizedEndRoute<Locales extends LocaleType, RouteRef> implements EndRoute<Locales, RouteRef>, NotLocalizedRoute<EndRoutePath, Locales, RouteRef> {
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
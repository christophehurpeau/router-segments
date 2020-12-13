import type { EndRoute, NotLocalizedRoute } from './interfaces';
import type { EndRoutePath, RouteRef } from './types';
export default class NotLocalizedEndRoute implements EndRoute, NotLocalizedRoute<EndRoutePath> {
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
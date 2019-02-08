import { EndRoutePath, RouteRef } from './types';
import { EndRoute, NotLocalizedRoute } from './interfaces';
export default class NotLocalizedEndRoute implements EndRoute, NotLocalizedRoute<EndRoutePath> {
    path: EndRoutePath;
    ref: RouteRef;
    constructor(path: EndRoutePath, ref: RouteRef);
    getPath(): EndRoutePath;
    isSegment(): false;
    isLocalized(): false;
    toJSON(): EndRoutePath;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedEndRoute.d.ts.map
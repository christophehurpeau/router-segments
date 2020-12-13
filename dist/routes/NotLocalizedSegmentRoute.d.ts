import type NotLocalizedEndRoute from './NotLocalizedEndRoute';
import type { SegmentRoute, NotLocalizedRoute } from './interfaces';
import type { SegmentRoutePath } from './types';
export default class NotLocalizedSegmentRoute implements SegmentRoute, NotLocalizedRoute<SegmentRoutePath> {
    path: SegmentRoutePath;
    nestedRoutes: NotLocalizedRoute<any>[];
    defaultRoute: undefined | NotLocalizedEndRoute;
    constructor(path: SegmentRoutePath);
    freeze(): void;
    getPath(): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): false;
    toJSON(): unknown;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedSegmentRoute.d.ts.map
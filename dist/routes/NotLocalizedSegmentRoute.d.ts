import NotLocalizedEndRoute from './NotLocalizedEndRoute';
import { SegmentRoute, NotLocalizedRoute } from './interfaces';
import { SegmentRoutePath } from './types';
export default class NotLocalizedSegmentRoute implements SegmentRoute, NotLocalizedRoute<SegmentRoutePath> {
    path: SegmentRoutePath;
    nestedRoutes: NotLocalizedRoute<any>[];
    defaultRoute: undefined | NotLocalizedEndRoute;
    constructor(path: SegmentRoutePath);
    freeze(): void;
    getPath(): SegmentRoutePath;
    isSegment(): true;
    isLocalized(): false;
    toJSON(): SegmentRoutePath;
    toString(): string;
}
//# sourceMappingURL=NotLocalizedSegmentRoute.d.ts.map
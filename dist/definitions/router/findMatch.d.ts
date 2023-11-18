import type { Route } from '../routes/interfaces';
import type { LocaleType, RoutePathInterface, SegmentRoutePath, EndRoutePath } from '../types';
export interface RouteMatch<Locales extends LocaleType | never, RouteRef> {
    namedParams: Map<string, string> | undefined;
    otherParams: string[] | undefined;
    path: string;
    ref: RouteRef;
    route: Route<any, Locales, RouteRef>;
    routePath: EndRoutePath | SegmentRoutePath;
}
export declare function findMatch<Locales extends LocaleType, RouteRef>(path: string, routes: Route<RoutePathInterface, Locales, RouteRef>[], locale?: Locales): RouteMatch<Locales, RouteRef> | null;
//# sourceMappingURL=findMatch.d.ts.map
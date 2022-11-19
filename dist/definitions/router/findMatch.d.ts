import type { Route } from '../routes/interfaces';
import type { LocaleType, RoutePathInterface, RouteRef, SegmentRoutePath, EndRoutePath } from '../types';
export interface RouteMatch<Locales extends LocaleType | never = any> {
    namedParams: Map<string, string> | undefined;
    otherParams: string[] | undefined;
    path: string;
    ref: RouteRef;
    route: Route<any, Locales>;
    routePath: EndRoutePath | SegmentRoutePath;
}
export declare function findMatch<Locales extends LocaleType>(path: string, routes: Route<RoutePathInterface, Locales>[], locale?: Locales): RouteMatch<Locales> | null;
//# sourceMappingURL=findMatch.d.ts.map
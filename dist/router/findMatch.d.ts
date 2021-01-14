import type { Route } from '../routes/interfaces';
import type { Routes, LocaleType, RouteRef, SegmentRoutePath, EndRoutePath } from '../types';
export interface RouteMatch<Locales extends LocaleType | never = any> {
    namedParams: undefined | Map<string, string>;
    otherParams: undefined | string[];
    path: string;
    ref: RouteRef;
    route: Route<any, Locales>;
    routePath: SegmentRoutePath | EndRoutePath;
}
export declare function findMatch<Locales extends LocaleType>(path: string, routes: Routes<Locales>, locale?: Locales): null | RouteMatch<Locales>;
//# sourceMappingURL=findMatch.d.ts.map
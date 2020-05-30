import { Routes, LocaleType, RouteRef, SegmentRoutePath, EndRoutePath } from '../types';
import { Route } from '../routes/interfaces';
export interface RouteMatch<Locales extends LocaleType | never> {
    namedParams: undefined | Map<string, string>;
    otherParams: undefined | string[];
    path: string;
    ref: RouteRef;
    route: Route<any, Locales>;
    routePath: SegmentRoutePath | EndRoutePath;
}
export default function findMatch<Locales extends LocaleType>(path: string, routes: Routes<Locales>, locale?: Locales): null | RouteMatch<Locales>;
//# sourceMappingURL=findMatch.d.ts.map
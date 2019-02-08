import { LocaleType, RouteRef, SegmentRoutePath, EndRoutePath } from '../types';
import { Route } from '../routes/interfaces';
export interface RouteMatch<Locales extends LocaleType | never> {
    namedParams: undefined | Map<string, string>;
    otherParams: undefined | string[];
    path: string;
    ref: RouteRef;
    route: Route<any, Locales>;
    routePath: SegmentRoutePath | EndRoutePath;
}
declare const _default: <Locales extends string>(path: string, routes: Route<any, Locales>[], locale?: Locales | undefined) => RouteMatch<Locales> | null;
export default _default;
//# sourceMappingURL=findMatch.d.ts.map
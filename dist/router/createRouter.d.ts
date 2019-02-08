import { LocaleType } from '../types';
import { EndRoute } from '../routes/interfaces';
import { RouteMatch } from './findMatch';
export interface Router<Locales extends LocaleType | never> {
    get(key: string): EndRoute;
    find(path: string, locale?: Locales): null | RouteMatch<Locales>;
    toLocalizedPath(locale: Locales, key: string, args?: any): string;
    toPath(key: string, args?: any): string;
}
declare const _default: <Locales extends string>(routes: import("../routes/interfaces").Route<any, Locales>[], routeMap: Map<string, EndRoute<Locales>>) => Router<Locales>;
export default _default;
//# sourceMappingURL=createRouter.d.ts.map
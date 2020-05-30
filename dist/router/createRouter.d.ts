import { Routes, RouteMap, LocaleType } from '../types';
import { EndRoute } from '../routes/interfaces';
import { RouteMatch } from './findMatch';
export interface Router<Locales extends LocaleType | never> {
    get(key: string): EndRoute;
    find(path: string, locale?: Locales): null | RouteMatch<Locales>;
    toLocalizedPath(locale: Locales, key: string, args?: any): string;
    toPath(key: string, args?: any): string;
}
export default function createRouter<Locales extends LocaleType | never>(routes: Routes<Locales>, routeMap: RouteMap<Locales>): Router<Locales>;
//# sourceMappingURL=createRouter.d.ts.map
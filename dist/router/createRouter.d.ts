import type { EndRoute } from '../routes/interfaces';
import type { Routes, RouteMap, LocaleType } from '../types';
import type { RouteMatch } from './findMatch';
export interface Router<Locales extends LocaleType | never = any> {
    get: (key: string) => EndRoute<Locales>;
    find: (path: string, locale?: Locales) => null | RouteMatch<Locales>;
    toLocalizedPath: (locale: Locales, key: string, args?: any) => string;
    toPath: (key: string, args?: any) => string;
}
export declare function createRouter<Locales extends LocaleType | never>(routes: Routes<Locales>, routeMap: RouteMap<Locales>): Router<Locales>;
//# sourceMappingURL=createRouter.d.ts.map
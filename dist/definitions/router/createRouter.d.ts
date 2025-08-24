import type { EndRoute } from "../routes/interfaces.ts";
import type { LocaleType, RouteMap, Routes } from "../types.ts";
import type { RouteMatch } from "./findMatch.ts";
export interface Router<Locales extends LocaleType | never, RouteRef> {
    get: (key: string) => EndRoute<Locales, RouteRef>;
    find: (path: string, locale?: Locales) => RouteMatch<Locales, RouteRef> | null;
    toLocalizedPath: (locale: Locales, key: string, args?: any) => string;
    toPath: (key: string, args?: any) => string;
}
export declare function createRouter<Locales extends LocaleType | never, RouteRef>(routes: Routes<Locales, RouteRef>, routeMap: RouteMap<Locales, RouteRef>): Router<Locales, RouteRef>;
//# sourceMappingURL=createRouter.d.ts.map
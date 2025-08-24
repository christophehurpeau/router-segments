import type { LocaleType, LocalizedPathsRecord } from "../types.ts";
import { LocalizedEndRoute } from "./LocalizedEndRoute.ts";
import { LocalizedSegmentRoute } from "./LocalizedSegmentRoute.ts";
import { NotLocalizedEndRoute as Route } from "./NotLocalizedEndRoute.ts";
import { NotLocalizedSegmentRoute } from "./NotLocalizedSegmentRoute.ts";
export declare const createRoute: <Locales extends LocaleType, RouteRef>(path: string, completePath: string, ref: RouteRef) => Route<Locales, RouteRef>;
export declare const createLocalizedRoute: <Locales extends LocaleType, RouteRef>(localizedPathsRecord: LocalizedPathsRecord<Locales>, completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>, ref: RouteRef) => LocalizedEndRoute<Locales, RouteRef>;
export declare const createSegmentRoute: <Locales extends LocaleType, RouteRef>(path: string, completePath: string) => NotLocalizedSegmentRoute<Locales, RouteRef>;
export declare const createLocalizedSegmentRoute: <Locales extends LocaleType, RouteRef>(localizedPathsRecord: LocalizedPathsRecord<Locales>, completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>) => LocalizedSegmentRoute<Locales, RouteRef>;
//# sourceMappingURL=create.d.ts.map
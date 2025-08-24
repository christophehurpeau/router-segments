import type { Router } from "../router/createRouter.ts";
import type { LocaleType, LocalizedPathsRecord, Routes } from "../types.ts";
import type { SegmentRouterBuilder } from "./createSegmentRouterBuilderCreator.ts";
export interface RouterBuilder<Locales extends LocaleType | never, RouteRef> {
    add: (path: string, ref: RouteRef, key?: string) => this;
    addLocalized: (localizedPaths: LocalizedPathsRecord<Locales>, ref: RouteRef, key?: string) => this;
    addLocalizedSegment: (localizedPaths: LocalizedPathsRecord<Locales>, buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void) => this;
    addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void) => this;
    createRouter: () => Router<Locales, RouteRef>;
    getRoutes: () => Routes<Locales, RouteRef>;
}
export declare function createRouterBuilder<Locales extends LocaleType, RouteRef>(locales?: Locales[]): RouterBuilder<Locales, RouteRef>;
//# sourceMappingURL=createRouterBuilder.d.ts.map
import { LocaleType, LocalizedPathsRecord, Routes, RouteRef } from '../types';
import { Router } from '../router/createRouter';
import { SegmentRouterBuilder } from './createSegmentRouterBuilderCreator';
export interface RouterBuilder<Locales extends LocaleType | never> {
    add(path: string, ref: RouteRef, key?: string): void;
    addLocalized(localizedPaths: LocalizedPathsRecord<Locales>, ref: RouteRef, key?: string): void;
    addLocalizedSegment(localizedPaths: LocalizedPathsRecord<Locales>, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void): void;
    addSegment(path: string, buildSegment: (builder: SegmentRouterBuilder<Locales>) => void): void;
    createRouter(): Router<Locales>;
    getRoutes(): Routes<Locales>;
}
declare const _default: <Locales extends string>(locales?: Locales[] | undefined) => RouterBuilder<Locales>;
export default _default;
//# sourceMappingURL=createRouterBuilder.d.ts.map
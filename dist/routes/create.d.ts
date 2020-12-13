import type { LocalizedPathsRecord, RouteRef } from '../types';
import LocalizedEndRoute from './LocalizedEndRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';
import Route from './NotLocalizedEndRoute';
import NotLocalizedSegmentRoute from './NotLocalizedSegmentRoute';
export declare const createRoute: (path: string, completePath: string, ref: RouteRef) => Route;
export declare const createLocalizedRoute: <Locales extends string>(localizedPathsRecord: Record<Locales, string>, completeLocalizedPathsRecord: Record<Locales, string>, ref: RouteRef) => LocalizedEndRoute<Locales>;
export declare const createSegmentRoute: (path: string, completePath: string) => NotLocalizedSegmentRoute;
export declare const createLocalizedSegmentRoute: <Locales extends string>(localizedPathsRecord: Record<Locales, string>, completeLocalizedPathsRecord: Record<Locales, string>) => LocalizedSegmentRoute<Locales>;
//# sourceMappingURL=create.d.ts.map
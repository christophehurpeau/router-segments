import type { LocalizedPathsRecord, RouteRef } from '../types';
import { LocalizedEndRoute } from './LocalizedEndRoute';
import { LocalizedSegmentRoute } from './LocalizedSegmentRoute';
import { NotLocalizedEndRoute as Route } from './NotLocalizedEndRoute';
import { NotLocalizedSegmentRoute } from './NotLocalizedSegmentRoute';
export declare const createRoute: (path: string, completePath: string, ref: RouteRef) => Route;
export declare const createLocalizedRoute: <Locales extends string>(localizedPathsRecord: LocalizedPathsRecord<Locales>, completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>, ref: RouteRef) => LocalizedEndRoute<Locales>;
export declare const createSegmentRoute: (path: string, completePath: string) => NotLocalizedSegmentRoute;
export declare const createLocalizedSegmentRoute: <Locales extends string>(localizedPathsRecord: LocalizedPathsRecord<Locales>, completeLocalizedPathsRecord: LocalizedPathsRecord<Locales>) => LocalizedSegmentRoute<Locales>;
//# sourceMappingURL=create.d.ts.map
import Route from './NotLocalizedEndRoute';
import LocalizedEndRoute from './LocalizedEndRoute';
import NotLocalizedSegmentRoute from './NotLocalizedSegmentRoute';
import LocalizedSegmentRoute from './LocalizedSegmentRoute';
export declare const createRoute: (path: string, completePath: string, ref: any) => Route;
export declare const createLocalizedRoute: <Locales extends string>(localizedPathsRecord: Record<Locales, string>, completeLocalizedPathsRecord: Record<Locales, string>, ref: any) => LocalizedEndRoute<Locales>;
export declare const createSegmentRoute: (path: string, completePath: string) => NotLocalizedSegmentRoute;
export declare const createLocalizedSegmentRoute: <Locales extends string>(localizedPathsRecord: Record<Locales, string>, completeLocalizedPathsRecord: Record<Locales, string>) => LocalizedSegmentRoute<Locales>;
//# sourceMappingURL=create.d.ts.map
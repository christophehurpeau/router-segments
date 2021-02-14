import type { LocaleType, RoutePathInterface } from 'routes/types';
import type { EndRoute, Route } from './routes/interfaces';
export type { LocaleType, RouteRef, RoutePathInterface, EndRoutePath, SegmentRoutePath, } from './routes/types';
export declare type LocalizedPathsRecord<Locales extends LocaleType> = Record<Locales, string>;
export declare type Routes<Locales> = Route<RoutePathInterface, Locales>[];
export declare type RouteMap<Locales extends LocaleType> = Map<string, EndRoute<Locales>>;
//# sourceMappingURL=types.d.ts.map
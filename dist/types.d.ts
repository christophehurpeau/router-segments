import type { EndRoute, Route } from './routes/interfaces';
import type * as routesTypes2 from './routes/types';
export declare type LocaleType = routesTypes2.LocaleType;
export declare type RouteRef = routesTypes2.RouteRef;
export declare type RoutePathInterface = routesTypes2.RoutePathInterface;
export declare type EndRoutePath = routesTypes2.EndRoutePath;
export declare type SegmentRoutePath = routesTypes2.SegmentRoutePath;
export declare type LocalizedPathsRecord<Locales extends LocaleType> = Record<Locales, string>;
export declare type Routes<Locales> = Route<RoutePathInterface, Locales>[];
export declare type RouteMap<Locales extends LocaleType> = Map<string, EndRoute<Locales>>;
//# sourceMappingURL=types.d.ts.map
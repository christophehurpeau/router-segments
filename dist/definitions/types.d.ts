import type { EndRoute, Route } from './routes/interfaces';
import type { LocaleType, RoutePathInterface } from './routes/types';
export type { LocaleType, RouteRef, RoutePathInterface, EndRoutePath, SegmentRoutePath, } from './routes/types';
export type LocalizedPathsRecord<Locales extends LocaleType> = Record<Locales, string>;
export type Routes<Locales> = Route<RoutePathInterface, Locales>[];
export type RouteMap<Locales extends LocaleType> = Map<string, EndRoute<Locales>>;
//# sourceMappingURL=types.d.ts.map
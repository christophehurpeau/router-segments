import type { LocaleType, RoutePathInterface } from 'routes/types';
import type { EndRoute, Route } from './routes/interfaces';

export type {
  LocaleType,
  RouteRef,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
} from './routes/types';

export type LocalizedPathsRecord<Locales extends LocaleType> = Record<
  Locales,
  string
>;

// export SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type Routes<Locales> = Route<RoutePathInterface, Locales>[];
export type RouteMap<Locales extends LocaleType> = Map<
  string,
  EndRoute<Locales>
>;

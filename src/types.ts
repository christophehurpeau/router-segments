import type { EndRoute, Route } from './routes/interfaces';
import type { LocaleType, RoutePathInterface } from './routes/types';

export type {
  LocaleType,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
} from './routes/types';

export type LocalizedPathsRecord<Locales extends LocaleType> = Record<
  Locales,
  string
>;

// export SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type Routes<Locales extends LocaleType, RouteRef> = Route<
  RoutePathInterface,
  Locales,
  RouteRef
>[];
export type RouteMap<Locales extends LocaleType, RouteRef> = Map<
  string,
  EndRoute<Locales, RouteRef>
>;

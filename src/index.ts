export type {
  LocaleType,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
  LocalizedPathsRecord,
  Routes,
  RouteMap,
} from './types';

export type {
  EndRoute,
  LocalizedRoute,
  NotLocalizedRoute,
  Route,
  SegmentRoute,
} from './routes/interfaces';
export type { Router } from './router/createRouter';
export type { RouteMatch } from './router/findMatch';
export type { RouterBuilder } from './builder/createRouterBuilder';

export { createRouterBuilder } from './builder/createRouterBuilder';

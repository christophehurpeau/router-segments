export type {
  LocaleType,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
  LocalizedPathsRecord,
  Routes,
  RouteMap,
} from "./types.ts";

export type {
  EndRoute,
  LocalizedRoute,
  NotLocalizedRoute,
  Route,
  SegmentRoute,
} from "./routes/interfaces.ts";
export type { Router } from "./router/createRouter.ts";
export type { RouteMatch } from "./router/findMatch.ts";
export type { RouterBuilder } from "./builder/createRouterBuilder.ts";

export { createRouterBuilder } from "./builder/createRouterBuilder.ts";

import type { Router } from "../router/createRouter";
import { createRouter } from "../router/createRouter";
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from "../routes/create";
import type { EndRoute } from "../routes/interfaces";
import type {
  LocaleType,
  LocalizedPathsRecord,
  Routes,
  RouteMap,
} from "../types";
import type { SegmentRouterBuilder } from "./createSegmentRouterBuilderCreator";
import { createSegmentRouterBuilderCreator } from "./createSegmentRouterBuilderCreator";

export interface RouterBuilder<Locales extends LocaleType | never, RouteRef> {
  add: (path: string, ref: RouteRef, key?: string) => this;
  addLocalized: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    ref: RouteRef,
    key?: string
  ) => this;
  addLocalizedSegment: (
    localizedPaths: LocalizedPathsRecord<Locales>,
    buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void
  ) => this;
  addSegment: (
    path: string,
    buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void
  ) => this;
  createRouter: () => Router<Locales, RouteRef>;
  getRoutes: () => Routes<Locales, RouteRef>;
}

export function createRouterBuilder<Locales extends LocaleType, RouteRef>(
  locales?: Locales[]
): RouterBuilder<Locales, RouteRef> {
  const defaultLocale = locales?.[0];
  const routes: Routes<Locales, RouteRef> = [];
  const routeMap: RouteMap<Locales, RouteRef> = new Map<
    string,
    EndRoute<Locales, RouteRef>
  >();

  const addToRouteMap = (
    key: string,
    route: EndRoute<Locales, RouteRef>
  ): void => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(
    defaultLocale,
    addToRouteMap
  );

  const builder: RouterBuilder<Locales, RouteRef> = {
    add: (path: string, ref: RouteRef, key?: string) => {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
      return builder;
    },

    addLocalized: (
      localizedPaths: LocalizedPathsRecord<Locales>,
      ref: RouteRef,
      key?: string
    ) => {
      if (!defaultLocale) throw new Error("Invalid locales");
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey: string = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
      return builder;
    },

    addSegment: (
      path: string,
      buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void
    ) => {
      const route = createSegmentRoute<Locales, RouteRef>(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
      return builder;
    },

    addLocalizedSegment: (
      localizedPaths: LocalizedPathsRecord<Locales>,
      buildSegment: (builder: SegmentRouterBuilder<Locales, RouteRef>) => void
    ) => {
      if (!defaultLocale) throw new Error("Invalid locales");
      const route = createLocalizedSegmentRoute<Locales, RouteRef>(
        localizedPaths,
        localizedPaths
      );
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
      return builder;
    },

    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap),
  };
  return builder;
}

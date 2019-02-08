import {
  LocaleType,
  LocalizedPathsRecord,
  Routes,
  RouteMap,
  RouteRef,
} from '../types';
import {
  createRoute,
  createLocalizedRoute,
  createSegmentRoute,
  createLocalizedSegmentRoute,
} from '../routes/create';
import createRouter, { Router } from '../router/createRouter';
import { EndRoute } from '../routes/interfaces';
import createSegmentRouterBuilderCreator, {
  SegmentRouterBuilder,
} from './createSegmentRouterBuilderCreator';

export interface RouterBuilder<Locales extends LocaleType | never> {
  add(path: string, ref: RouteRef, key?: string): void;
  addLocalized(
    localizedPaths: LocalizedPathsRecord<Locales>,
    ref: RouteRef,
    key?: string,
  ): void;
  addLocalizedSegment(
    localizedPaths: LocalizedPathsRecord<Locales>,
    buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
  ): void;
  addSegment(
    path: string,
    buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
  ): void;
  createRouter(): Router<Locales>;
  getRoutes(): Routes<Locales>;
}

export default <Locales extends LocaleType>(
  locales?: Locales[],
): RouterBuilder<Locales> => {
  const defaultLocale = locales && locales[0];
  const routes: Routes<Locales> = [];
  const routeMap: RouteMap<Locales> = new Map();

  const addToRouteMap = (key: string, route: EndRoute<Locales>) => {
    if (routeMap.has(key)) throw new Error(`"${key}" is already used`);
    routeMap.set(key, route);
  };

  const createSegmentRouterBuilder = createSegmentRouterBuilderCreator(
    defaultLocale,
    addToRouteMap,
  );

  return {
    add: (path: string, ref: RouteRef, key?: string): void => {
      const route = createRoute(path, path, ref);
      routes.push(route);
      if (!key) key = path;
      addToRouteMap(key, route);
    },

    addLocalized: (
      localizedPaths: LocalizedPathsRecord<Locales>,
      ref: RouteRef,
      key?: string,
    ): void => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedRoute(localizedPaths, localizedPaths, ref);
      routes.push(route);
      const finalKey: string = key || localizedPaths[defaultLocale];
      addToRouteMap(finalKey, route);
    },

    addSegment: (
      path: string,
      buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
    ): void => {
      const route = createSegmentRoute(path, path);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    addLocalizedSegment: (
      localizedPaths: LocalizedPathsRecord<Locales>,
      buildSegment: (builder: SegmentRouterBuilder<Locales>) => void,
    ): void => {
      if (!defaultLocale) throw new Error('Invalid locales');
      const route = createLocalizedSegmentRoute(localizedPaths, localizedPaths);
      buildSegment(createSegmentRouterBuilder(route));
      route.freeze();
      routes.push(route);
    },

    getRoutes: () => routes,
    createRouter: () => createRouter(routes, routeMap),
  };
};

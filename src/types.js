import type { RouteType, EndRouteType } from './routes';
import type { RouteRefType, RoutePathType, SegmentRoutePathType, LocaleType } from './routes/types';

export type { RouteType, RouteRefType, RoutePathType, SegmentRoutePathType, LocaleType };

export type PathDictionaryType = { [LocaleType]: string };

export type SegmentRouterBuilderType = {|
  defaultRoute: (ref: RouteRefType, key?: ?string) => void,
  add: (path: string, ref: RouteRefType, key?: ?string) => void,
  addLocalized: (localizedPaths: PathDictionaryType, ref: RouteRefType, key?: ?string) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  addLocalizedSegment: (
    localizedPaths: PathDictionaryType,
    buildSegment: (builder: SegmentRouterBuilderType) => void,
  ) => void,
|};

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type RoutesType = Array<RouteType>;
export type RouteMapType = Map<string, RouteType>;

export type RouteMatchType = {|
  ref: RouteRefType,
  path: string,
  route: RouteType,
  routePath: SegmentRoutePathType | RoutePathType,
  namedParams: ?Map<string, string>,
  otherParams: ?Array<string>,
|};

export type RouterType = {|
  get: (key: string) => ?EndRouteType,
  find: (path: string, locale?: ?string) => ?RouteMatchType,
  toPath: (key: string, args: any) => string,
  toLocalizedPath: (locale: string, key: string, args: any) => string,
|};

export type RouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key?: ?string) => void,
  addLocalized: (localizedPaths: PathDictionaryType, ref: RouteRefType, key?: ?string) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  addLocalizedSegment: (
    localizedPaths: PathDictionaryType,
    buildSegment: (builder: SegmentRouterBuilderType) => void,
  ) => void,
  getRoutes: () => RoutesType,
  createRouter: () => RouterType,
|};

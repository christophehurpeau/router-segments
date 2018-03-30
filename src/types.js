import type { RouteType, EndRouteType } from './routes';
import type { RouteRefType, RoutePathType, SegmentRoutePathType, LocaleType } from './routes/types';

export type { RouteType, RouteRefType, RoutePathType, SegmentRoutePathType, LocaleType };

export type PathDictionaryType = { [LocaleType]: string };

export type SegmentRouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key?: ?string) => void,
  addLocalized: (localizedPaths: PathDictionaryType, ref: RouteRefType, key?: ?string) => void,
  addLocalizedSegment: (
    localizedPaths: PathDictionaryType,
    buildSegment: (builder: SegmentRouterBuilderType) => void,
  ) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  defaultRoute: (ref: RouteRefType, key?: ?string) => void,
|};

// export type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;

export type RoutesType = Array<RouteType>;
export type RouteMapType = Map<string, RouteType>;

export type RouteMatchType = {|
  namedParams: ?Map<string, string>,
  otherParams: ?Array<string>,
  path: string,
  ref: RouteRefType,
  route: RouteType,
  routePath: SegmentRoutePathType | RoutePathType,
|};

export type RouterType = {|
  find: (path: string, locale?: ?string) => ?RouteMatchType,
  get: (key: string) => ?EndRouteType,
  toLocalizedPath: (locale: string, key: string, args: any) => string,
  toPath: (key: string, args: any) => string,
|};

export type RouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key?: ?string) => void,
  addLocalized: (localizedPaths: PathDictionaryType, ref: RouteRefType, key?: ?string) => void,
  addLocalizedSegment: (
    localizedPaths: PathDictionaryType,
    buildSegment: (builder: SegmentRouterBuilderType) => void,
  ) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  createRouter: () => RouterType,
  getRoutes: () => RoutesType,
|};

import type {
  LocaleType,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
} from './types';

export interface Route<
  T extends RoutePathInterface,
  Locales extends LocaleType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- helps typescript to infer the type
  RouteRef,
> {
  isSegment: () => boolean;
  isLocalized: () => boolean;
  getPath: (locale?: Locales) => T;

  toJSON: () => any;

  toString: () => string;
}

export interface EndRoute<Locales extends LocaleType, RouteRef>
  extends Route<EndRoutePath, Locales, RouteRef> {
  ref: RouteRef;

  isSegment: () => false;
}

export interface SegmentRoute<Locales extends LocaleType, RouteRef>
  extends Route<SegmentRoutePath, Locales, RouteRef> {
  defaultRoute: EndRoute<Locales, RouteRef> | undefined;
  nestedRoutes: Route<RoutePathInterface, Locales, RouteRef>[];

  isSegment: () => true;
}

export interface NotLocalizedRoute<
  T extends RoutePathInterface,
  Locales extends LocaleType,
  RouteRef,
> extends Route<T, Locales, RouteRef> {
  isLocalized: () => false;
  getPath: () => T;
}

export interface LocalizedRoute<
  T extends RoutePathInterface,
  Locales extends LocaleType,
  RouteRef,
> extends Route<T, Locales, RouteRef> {
  isLocalized: () => true;
  getPath: (locale?: Locales) => T;
}

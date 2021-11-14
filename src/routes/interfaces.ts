import type {
  LocaleType,
  RouteRef,
  RoutePathInterface,
  EndRoutePath,
  SegmentRoutePath,
} from './types';

export interface Route<T extends RoutePathInterface, Locales = LocaleType> {
  isSegment: () => boolean;
  isLocalized: () => boolean;
  getPath: (locale?: Locales) => T;

  toJSON: () => any;

  toString: () => string;
}

export interface EndRoute<Locales = LocaleType>
  extends Route<EndRoutePath, Locales> {
  ref: RouteRef;

  isSegment: () => false;
}

export interface SegmentRoute<Locales = LocaleType>
  extends Route<SegmentRoutePath, Locales> {
  defaultRoute: EndRoute<Locales> | undefined;
  nestedRoutes: Route<RoutePathInterface, Locales>[];

  isSegment: () => true;
}

export interface NotLocalizedRoute<
  T extends RoutePathInterface,
  Locales extends LocaleType,
> extends Route<T, Locales> {
  isLocalized: () => false;
  getPath: () => T;
}

export interface LocalizedRoute<
  T extends RoutePathInterface,
  Locales extends LocaleType,
> extends Route<T, Locales> {
  isLocalized: () => true;
  getPath: (locale?: Locales) => T;
}

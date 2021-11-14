export type RouteRef = any;

export type LocaleType = string;

type RoutePathNamedParams = (number | string)[];

export interface RoutePathInterface {
  completePath: string;
  namedParams: RoutePathNamedParams;
  path: string;
  regExp: RegExp;
}

export interface EndRoutePath extends RoutePathInterface {
  toPath: (args?: Record<string, any>) => string;
}

export type SegmentRoutePath = RoutePathInterface;

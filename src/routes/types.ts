export type RouteRef = any;

export type LocaleType = string;

type RoutePathNamedParams = (string | number)[];

export interface RoutePathInterface {
  completePath: string;
  namedParams: RoutePathNamedParams;
  path: string;
  regExp: RegExp;
}

export interface EndRoutePath extends RoutePathInterface {
  toPath: (args?: Record<string, any>) => string;
}

export interface SegmentRoutePath extends RoutePathInterface {}

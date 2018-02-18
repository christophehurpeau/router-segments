export type RouteRefType = any;

export type RoutePathType = {|
  path: string,
  completePath: string,
  regExp: RegExp,
  namedParams: Array<string>,
  toPath: (args: Object) => string,
|};

export type SegmentRoutePathType = {|
  path: string,
  completePath: string,
  regExp: RegExp,
  namedParams: Array<string>,
|};

export type LocaleType = string;

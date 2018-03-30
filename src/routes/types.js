export type RouteRefType = any;

export type RoutePathType = {|
  completePath: string,
  namedParams: Array<string>,
  path: string,
  regExp: RegExp,
  toPath: (args: Object) => string,
|};

export type SegmentRoutePathType = {|
  completePath: string,
  namedParams: Array<string>,
  path: string,
  regExp: RegExp,
|};

export type LocaleType = string;

export declare type RouteRef = any;
export declare type LocaleType = string;
declare type RoutePathNamedParams = (number | string)[];
export interface RoutePathInterface {
    completePath: string;
    namedParams: RoutePathNamedParams;
    path: string;
    regExp: RegExp;
}
export interface EndRoutePath extends RoutePathInterface {
    toPath: (args?: Record<string, any>) => string;
}
export declare type SegmentRoutePath = RoutePathInterface;
export {};
//# sourceMappingURL=types.d.ts.map
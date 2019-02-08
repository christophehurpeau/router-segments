export declare type RouteRef = any;
export declare type LocaleType = string;
declare type RoutePathNamedParams = (string | number)[];
export interface RoutePathInterface {
    completePath: string;
    namedParams: RoutePathNamedParams;
    path: string;
    regExp: RegExp;
}
export interface EndRoutePath extends RoutePathInterface {
    toPath: (args?: Record<string, any>) => string;
}
export interface SegmentRoutePath extends RoutePathInterface {
}
export {};
//# sourceMappingURL=types.d.ts.map
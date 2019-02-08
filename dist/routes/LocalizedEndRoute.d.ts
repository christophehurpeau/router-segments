import { LocaleType, EndRoutePath, RouteRef } from './types';
import { EndRoute, LocalizedRoute } from './interfaces';
export default class LocalizedEndRoute<Locales extends LocaleType> implements EndRoute, LocalizedRoute<EndRoutePath, Locales> {
    localizedPaths: Map<LocaleType, EndRoutePath>;
    ref: RouteRef;
    constructor(localizedPaths: Map<LocaleType, EndRoutePath>, ref: RouteRef);
    getPath(locale: Locales): EndRoutePath;
    isSegment(): false;
    isLocalized(): true;
    toJSON(): [string, EndRoutePath][];
    toString(): string;
}
//# sourceMappingURL=LocalizedEndRoute.d.ts.map
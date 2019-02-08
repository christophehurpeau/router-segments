import { LocaleType, EndRoutePath, RouteRef } from './types';
import { EndRoute, LocalizedRoute } from './interfaces';

export default class LocalizedEndRoute<Locales extends LocaleType>
  implements EndRoute, LocalizedRoute<EndRoutePath, Locales> {
  localizedPaths: Map<LocaleType, EndRoutePath>;

  ref: RouteRef;

  constructor(localizedPaths: Map<LocaleType, EndRoutePath>, ref: RouteRef) {
    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale: Locales): EndRoutePath {
    return this.localizedPaths.get(locale) as EndRoutePath;
  }

  isSegment(): false {
    return false;
  }

  isLocalized(): true {
    return true;
  }

  toJSON() {
    return [...this.localizedPaths.entries()];
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

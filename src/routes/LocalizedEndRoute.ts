import type { EndRoute, LocalizedRoute } from './interfaces';
import type { LocaleType, EndRoutePath, RouteRef } from './types';

export default class LocalizedEndRoute<Locales extends LocaleType>
  implements EndRoute<Locales>, LocalizedRoute<EndRoutePath, Locales>
{
  localizedPaths: Map<LocaleType, EndRoutePath>;

  ref: RouteRef;

  constructor(localizedPaths: Map<LocaleType, EndRoutePath>, ref: RouteRef) {
    this.localizedPaths = localizedPaths;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale?: Locales): EndRoutePath {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale)!;
  }

  isSegment(): false {
    return false;
  }

  isLocalized(): true {
    return true;
  }

  toJSON(): unknown[] {
    return [...this.localizedPaths.entries()];
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}

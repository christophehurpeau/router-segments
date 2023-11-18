import type { EndRoute, LocalizedRoute } from './interfaces';
import type { LocaleType, EndRoutePath } from './types';

export class LocalizedEndRoute<Locales extends LocaleType, RouteRef>
  implements
    EndRoute<Locales, RouteRef>,
    LocalizedRoute<EndRoutePath, Locales, RouteRef>
{
  localizedPaths: Map<LocaleType, EndRoutePath>;

  ref: RouteRef;

  constructor(localizedPaths: Map<LocaleType, EndRoutePath>, ref: RouteRef) {
    this.localizedPaths = localizedPaths;

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

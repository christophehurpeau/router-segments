import type LocalizedEndRoute from './LocalizedEndRoute';
import type { SegmentRoute, LocalizedRoute } from './interfaces';
import type { LocaleType, SegmentRoutePath } from './types';

export default class LocalizedSegmentRoute<Locales extends LocaleType>
  implements SegmentRoute<Locales>, LocalizedRoute<SegmentRoutePath, Locales> {
  localizedPaths: Map<Locales, SegmentRoutePath>;

  nestedRoutes: LocalizedRoute<any, Locales>[] = [];

  defaultRoute: undefined | LocalizedEndRoute<Locales>;

  constructor(localizedPaths: Map<Locales, SegmentRoutePath>) {
    this.localizedPaths = localizedPaths;
  }

  freeze(): void {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale?: Locales): SegmentRoutePath {
    if (!locale) throw new Error('Missing locale');
    return this.localizedPaths.get(locale) as SegmentRoutePath;
  }

  isSegment(): true {
    return true;
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

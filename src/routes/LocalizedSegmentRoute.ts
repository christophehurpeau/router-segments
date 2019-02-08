import LocalizedEndRoute from './LocalizedEndRoute';
import { LocaleType, SegmentRoutePath } from './types';
import { SegmentRoute, LocalizedRoute } from './interfaces';

export default class LocalizedSegmentRoute<Locales extends LocaleType>
  implements SegmentRoute, LocalizedRoute<SegmentRoutePath, Locales> {
  localizedPaths: Map<Locales, SegmentRoutePath>;

  nestedRoutes: LocalizedRoute<any, Locales>[] = [];

  defaultRoute: undefined | LocalizedEndRoute<Locales>;

  constructor(localizedPaths: Map<Locales, SegmentRoutePath>) {
    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale: Locales): SegmentRoutePath {
    return this.localizedPaths.get(locale) as SegmentRoutePath;
  }

  isSegment(): true {
    return true;
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

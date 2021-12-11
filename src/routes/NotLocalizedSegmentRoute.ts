import type { NotLocalizedEndRoute } from './NotLocalizedEndRoute';
import type { SegmentRoute, NotLocalizedRoute } from './interfaces';
import type { LocaleType, SegmentRoutePath } from './types';

export class NotLocalizedSegmentRoute<Locales extends LocaleType = LocaleType>
  implements
    SegmentRoute<Locales>,
    NotLocalizedRoute<SegmentRoutePath, Locales>
{
  path: SegmentRoutePath;

  nestedRoutes: NotLocalizedRoute<any, Locales>[] = [];

  defaultRoute: NotLocalizedEndRoute | undefined;

  constructor(path: SegmentRoutePath) {
    this.path = path;
  }

  freeze(): void {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(): SegmentRoutePath {
    return this.path;
  }

  isSegment(): true {
    return true;
  }

  isLocalized(): false {
    return false;
  }

  toJSON(): unknown {
    return this.path;
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}

import type NotLocalizedEndRoute from './NotLocalizedEndRoute';
import type { SegmentRoute, NotLocalizedRoute } from './interfaces';
import type { SegmentRoutePath } from './types';

export default class NotLocalizedSegmentRoute
  implements SegmentRoute, NotLocalizedRoute<SegmentRoutePath> {
  path: SegmentRoutePath;

  nestedRoutes: NotLocalizedRoute<any>[] = [];

  defaultRoute: undefined | NotLocalizedEndRoute;

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

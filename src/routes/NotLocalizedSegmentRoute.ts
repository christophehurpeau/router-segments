import NotLocalizedEndRoute from './NotLocalizedEndRoute';
import { SegmentRoute, NotLocalizedRoute } from './interfaces';
import { SegmentRoutePath } from './types';

export default class NotLocalizedSegmentRoute
  implements SegmentRoute, NotLocalizedRoute<SegmentRoutePath> {
  path: SegmentRoutePath;

  nestedRoutes: NotLocalizedRoute<any>[] = [];

  defaultRoute: undefined | NotLocalizedEndRoute;

  constructor(path: SegmentRoutePath) {
    this.path = path;
  }

  freeze() {
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

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

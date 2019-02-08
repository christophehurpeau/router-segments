import { EndRoutePath, RouteRef } from './types';
import { EndRoute, NotLocalizedRoute } from './interfaces';

export default class NotLocalizedEndRoute
  implements EndRoute, NotLocalizedRoute<EndRoutePath> {
  path: EndRoutePath;

  ref: RouteRef;

  constructor(path: EndRoutePath, ref: RouteRef) {
    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath(): EndRoutePath {
    return this.path;
  }

  isSegment(): false {
    return false;
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

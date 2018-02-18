import type { RoutePathType, RouteRefType } from './types';

export default class EndRoute {
  path: RoutePathType;
  ref: RouteRefType;

  constructor(path: RoutePathType, ref: RouteRefType) {
    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath(): RoutePathType {
    return this.path;
  }

  isSegment(): boolean {
    return false;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

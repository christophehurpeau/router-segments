import type { SegmentRoutePathType } from './types';
import type Route from './EndRoute';

export default class SegmentRoute {
  path: SegmentRoutePathType;
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  nestedRoutes = [];
  defaultRoute: ?Route;

  constructor(path: SegmentRoutePathType) {
    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(): SegmentRoutePathType {
    return this.path;
  }

  isSegment(): boolean {
    return true;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

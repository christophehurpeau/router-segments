import type { RoutePathType } from '../types';
import type Route from './EndRoute';

export default class SegmentRoute {
  path: RoutePathType;
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  nestedRoutes = [];
  defaultRoute: ?Route;

  constructor(path: RoutePathType) {
    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(): RoutePathType {
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

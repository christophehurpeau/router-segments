import type { LocaleType, SegmentRoutePathType } from './types';
import type LocalizedRoute from './LocalizedEndRoute';

export default class LocalizedSegmentRoute {
  localizedPaths: Map<LocaleType, SegmentRoutePathType>;
  nestedRoutes: Array<LocalizedRoute | LocalizedSegmentRoute> = [];
  defaultRoute: ?LocalizedRoute;

  constructor(localizedPaths: Map<LocaleType, SegmentRoutePathType>) {
    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale: LocaleType): ?SegmentRoutePathType {
    return this.localizedPaths.get(locale);
  }

  isSegment(): boolean {
    return true;
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

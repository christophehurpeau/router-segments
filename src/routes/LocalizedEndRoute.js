import type { LocaleType, RoutePathType, RouteRefType } from '../types';

export default class LocalizedEndRoute {
  localizedPaths: Map<LocaleType, RoutePathType>;
  ref: RouteRefType;

  constructor(localizedPaths: Map<LocaleType, RoutePathType>, ref: RouteRefType) {
    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale: LocaleType): ?RoutePathType {
    return this.localizedPaths.get(locale);
  }

  isSegment(): boolean {
    return false;
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

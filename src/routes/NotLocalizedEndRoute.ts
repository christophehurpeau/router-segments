import type { EndRoute, NotLocalizedRoute } from './interfaces';
import type { EndRoutePath, LocaleType, RouteRef } from './types';

export default class NotLocalizedEndRoute<
  Locales extends LocaleType = LocaleType,
> implements EndRoute<Locales>, NotLocalizedRoute<EndRoutePath, Locales>
{
  path: EndRoutePath;

  ref: RouteRef;

  constructor(path: EndRoutePath, ref: RouteRef) {
    this.path = path;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  toJSON(): unknown {
    return this.path;
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}

import type { EndRoute, NotLocalizedRoute } from './interfaces';
import type { EndRoutePath, LocaleType } from './types';

export class NotLocalizedEndRoute<Locales extends LocaleType, RouteRef>
  implements
    EndRoute<Locales, RouteRef>,
    NotLocalizedRoute<EndRoutePath, Locales, RouteRef>
{
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

  toJSON(): unknown {
    return this.path;
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}

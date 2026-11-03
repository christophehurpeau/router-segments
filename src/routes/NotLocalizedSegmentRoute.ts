import type { NotLocalizedEndRoute } from "./NotLocalizedEndRoute.ts";
import type { NotLocalizedRoute, SegmentRoute } from "./interfaces.ts";
import type { LocaleType, SegmentRoutePath } from "./types.ts";

export class NotLocalizedSegmentRoute<Locales extends LocaleType, RouteRef>
  implements
    SegmentRoute<Locales, RouteRef>,
    NotLocalizedRoute<SegmentRoutePath, Locales, RouteRef>
{
  path: SegmentRoutePath;

  nestedRoutes: NotLocalizedRoute<any, Locales, RouteRef>[] = [];

  defaultRoute: NotLocalizedEndRoute<Locales, RouteRef> | undefined;

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

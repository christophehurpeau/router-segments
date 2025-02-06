import type { LocalizedEndRoute } from "./LocalizedEndRoute";
import type { LocalizedRoute, SegmentRoute } from "./interfaces";
import type { LocaleType, SegmentRoutePath } from "./types";

export class LocalizedSegmentRoute<Locales extends LocaleType, RouteRef>
  implements
    SegmentRoute<Locales, RouteRef>,
    LocalizedRoute<SegmentRoutePath, Locales, RouteRef>
{
  localizedPaths: Map<Locales, SegmentRoutePath>;

  nestedRoutes: LocalizedRoute<any, Locales, RouteRef>[] = [];

  defaultRoute: LocalizedEndRoute<Locales, RouteRef> | undefined;

  constructor(localizedPaths: Map<Locales, SegmentRoutePath>) {
    this.localizedPaths = localizedPaths;
  }

  freeze(): void {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale?: Locales): SegmentRoutePath {
    if (!locale) throw new Error("Missing locale");
    return this.localizedPaths.get(locale)!;
  }

  isSegment(): true {
    return true;
  }

  isLocalized(): true {
    return true;
  }

  toJSON(): unknown[] {
    return [...this.localizedPaths.entries()];
  }

  toString(): string {
    return JSON.stringify(this.toJSON());
  }
}

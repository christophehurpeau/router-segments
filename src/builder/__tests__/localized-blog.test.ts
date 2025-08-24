/* eslint-disable regexp/no-useless-non-capturing-group */
/* eslint-disable unicorn/no-array-method-this-argument */

import { describe, expect, test } from "vitest";
import type { LocalizedEndRoute } from "../../routes/index.ts";
import { createRouterBuilder } from "../createRouterBuilder.ts";

describe("localized blog", () => {
  const ref = Symbol("ref");

  type Locales = "en" | "fr";
  const router = createRouterBuilder<Locales, symbol>(["en", "fr"])
    .add("/", ref)
    .addLocalized({ en: "/contact-us", fr: "/contactez-nous" }, ref)
    .addLocalizedSegment({ en: "/post", fr: "/article" }, (segmentBuilder) => {
      segmentBuilder.defaultRoute(ref, "postList");
      segmentBuilder.add("/:id.:slug", ref, "postView");
      segmentBuilder.addLocalizedSegment(
        { en: "/search", fr: "/rechercher" },
        (searchSegmentBuilder) => {
          searchSegmentBuilder.defaultRoute(ref, "search");
          searchSegmentBuilder.addLocalized(
            { en: "/top-searched", fr: "/les-plus-recherches" },
            ref,
            "top-searched",
          );
          searchSegmentBuilder.addSegment(
            "/:term",
            (searchTermSegmentBuilder) => {
              searchTermSegmentBuilder.defaultRoute(ref, "search-results");
              searchTermSegmentBuilder.addLocalized(
                { en: "/tag-:tag", fr: "/etiquette-:tag" },
                ref,
                "search-results-tag",
              );
            },
          );
        },
      );
      segmentBuilder.add("{/:tag}/:date{_:slug}", ref, "postWithTag");
    })
    .createRouter();

  describe("postList", () => {
    describe("route", () => {
      const rrPostList = router.get("postList") as LocalizedEndRoute<
        Locales,
        symbol
      >;

      test("en", () => {
        const routePath = rrPostList.localizedPaths.get("en")!;

        expect(routePath.completePath).toEqual("/post");
        expect(routePath.toPath()).toBe("/post");
      });

      test("fr", () => {
        const routePath = rrPostList.localizedPaths.get("fr")!;

        expect(routePath.completePath).toEqual("/article");
        expect(routePath.toPath()).toBe("/article");
      });
    });

    describe("find", () => {
      const enPath = "/post";
      test("en", () => {
        const match = router.find(enPath)!;
        expect(match.path).toBe(enPath);
        expect(match.route).toBe(router.get("postList"));
        expect(match.namedParams).toBe(undefined);
      });

      test("fr", () => {
        expect(router.find(enPath, "fr")).toBe(null);

        const frPath = "/article";
        const match = router.find(frPath, "fr")!;
        expect(match.path).toBe(frPath);
        expect(match.route).toBe(router.get("postList"));
        expect(match.namedParams).toBe(undefined);
      });
    });
  });

  describe("postView", () => {
    describe("route", () => {
      const rrPostView = router.get("postView") as LocalizedEndRoute<
        Locales,
        symbol
      >;

      test("en", () => {
        const routePath = rrPostView.localizedPaths.get("en")!;

        expect(routePath.namedParams).toEqual(["id", "slug"]);
        expect(routePath.toPath({ id: "001", slug: "The-First-Post" })).toBe(
          "/post/001.The-First-Post",
        );
      });

      test("fr", () => {
        const routePath = rrPostView.localizedPaths.get("fr")!;

        expect(routePath.namedParams).toEqual(["id", "slug"]);
        expect(routePath.toPath({ id: "001", slug: "The-First-Post" })).toBe(
          "/article/001.The-First-Post",
        );
      });
    });

    describe("find", () => {
      const enPath = "/post/001.The-First-Post";
      test("en", () => {
        const match = router.find(enPath)!;
        expect(match.path).toBe(enPath);
        expect(match.route).toBe(router.get("postView"));
        expect(match.namedParams).toEqual(
          new Map([
            ["id", "001"],
            ["slug", "The-First-Post"],
          ]),
        );
      });

      test("fr", () => {
        expect(router.find(enPath, "fr")).toBe(null);

        const frPath = "/article/001.Le-Premier-Article";
        const match = router.find(frPath, "fr")!;
        expect(match.path).toBe(frPath);
        expect(match.route).toBe(router.get("postView"));
        expect(match.namedParams).toEqual(
          new Map([
            ["id", "001"],
            ["slug", "Le-Premier-Article"],
          ]),
        );
      });
    });
  });

  describe("postWithTag", () => {
    describe("route", () => {
      const rrPostWithTag = router.get("postWithTag") as LocalizedEndRoute<
        Locales,
        symbol
      >;

      test("en", () => {
        const routePath = rrPostWithTag.localizedPaths.get("en")!;
        expect(routePath.namedParams).toEqual([
          "tag",
          "date",
          "slug",
          "tag",
          "date",
          "date",
          "slug",
          "date",
        ]);

        expect(routePath.regExp).toEqual(
          // eslint-disable-next-line no-useless-escape, regexp/no-useless-escape
          /^(?:\/([^\/]+)\/([^\/]+)_([^\/_]+)|\/([^\/]+)\/([^\/]+)|\/([^\/]+)_([^\/_]+)|\/([^\/]+))$/,
        );

        expect(
          routePath.toPath({
            tag: "test",
            date: "2017-01-01",
            slug: "The-First-Post",
          }),
        ).toBe("/post/test/2017-01-01_The-First-Post");
      });

      test("fr", () => {
        const routePath = rrPostWithTag.localizedPaths.get("fr")!;
        expect(routePath.namedParams).toEqual([
          "tag",
          "date",
          "slug",
          "tag",
          "date",
          "date",
          "slug",
          "date",
        ]);

        expect(
          routePath.toPath({
            tag: "test",
            date: "2017-01-01",
            slug: "Le-Premier-Article",
          }),
        ).toBe("/article/test/2017-01-01_Le-Premier-Article");
      });
    });

    describe("find", () => {
      const enPath = "/post/tag1/2015-01-01_The-First-Post";
      test("en", () => {
        const match = router.find(enPath);
        expect(match!.path).toBe(enPath);
        expect(match!.route).toBe(router.get("postWithTag"));
        expect(match!.namedParams).toEqual(
          new Map([
            ["tag", "tag1"],
            ["date", "2015-01-01"],
            ["slug", "The-First-Post"],
          ]),
        );
      });

      test("fr", () => {
        expect(router.find(enPath, "fr")).toBe(null);

        const frPath = "/article/tag1/2015-01-01_Le-Premier-Article";
        const match = router.find(frPath, "fr");
        expect(match!.path).toBe(frPath);
        expect(match!.route).toBe(router.get("postWithTag"));
        expect(match!.namedParams).toEqual(
          new Map([
            ["tag", "tag1"],
            ["date", "2015-01-01"],
            ["slug", "Le-Premier-Article"],
          ]),
        );
      });
    });
  });

  describe("find contact-us", () => {
    const enPath = "/contact-us";
    test("en", () => {
      const match = router.find(enPath);
      expect(match!.routePath).toHaveProperty("completePath", "/contact-us");
      expect(match!.routePath).toHaveProperty("path", "/contact-us");
      expect(match!.routePath).toHaveProperty("regExp", /^(?:\/contact-us)$/);
    });

    test("fr", () => {
      expect(router.find(enPath, "fr")).toBe(null);

      const frPath = "/contactez-nous";
      const match = router.find(frPath, "fr");
      expect(match).toHaveProperty("path", frPath);
      expect(match).toHaveProperty("route", router.get("/contact-us"));
    });
  });

  describe("find search", () => {
    const enPath = "/post/search";
    test("en", () => {
      const match = router.find(enPath);
      expect(match).toHaveProperty("route", router.get("search"));
    });

    test("fr", () => {
      expect(router.find(enPath, "fr")).toBe(null);

      const frPath = "/article/rechercher";
      const match = router.find(frPath, "fr");
      expect(match).toHaveProperty("path", frPath);
      expect(match).toHaveProperty("route", router.get("search"));
    });
  });

  describe("find top-searched", () => {
    const enPath = "/post/search/top-searched";
    test("en", () => {
      const match = router.find(enPath);
      expect(match).toHaveProperty("route", router.get("top-searched"));
    });

    test("fr", () => {
      expect(router.find(enPath, "fr")).toBe(null);

      const frPath = "/article/rechercher/les-plus-recherches";
      const match = router.find(frPath, "fr");
      expect(match).toHaveProperty("path", frPath);
      expect(match).toHaveProperty("route", router.get("top-searched"));
    });
  });

  describe("find search-results", () => {
    const enPath = "/post/search/termsearched";
    test("en", () => {
      const match = router.find(enPath);
      expect(match?.route).toBe(router.get("search-results"));
      expect(match?.namedParams).toEqual(new Map([["term", "termsearched"]]));
    });

    test("fr", () => {
      expect(router.find(enPath, "fr")).toBe(null);

      const frPath = "/article/rechercher/termsearched";
      const match = router.find(frPath, "fr");
      expect(match?.path).toBe(frPath);
      expect(match?.route).toBe(router.get("search-results"));
    });
  });

  describe("find search-results-tag", () => {
    const enPath = "/post/search/termsearched/tag-tag1";
    test("en", () => {
      const match = router.find(enPath);
      expect(match?.route).toBe(router.get("search-results-tag"));
      expect(match?.namedParams).toEqual(
        new Map([
          ["term", "termsearched"],
          ["tag", "tag1"],
        ]),
      );
    });

    test("fr", () => {
      expect(router.find(enPath, "fr")).toBe(null);

      const frPath = "/article/rechercher/termsearched/etiquette-tag1";
      const match = router.find(frPath, "fr");
      expect(match?.path).toBe(frPath);
      expect(match?.route).toBe(router.get("search-results-tag"));
    });
  });
});

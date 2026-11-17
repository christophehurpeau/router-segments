/* oxlint-disable regexp/no-useless-non-capturing-group */
/* oxlint-disable regexp/no-useless-escape */
/* oxlint-disable no-useless-escape */
/* oxlint-disable regexp/no-empty-group */
import { describe, expect, test } from "vitest";
import type { RouteMatch } from "../../router/findMatch.ts";
import type {
  NotLocalizedEndRoute,
  NotLocalizedSegmentRoute,
} from "../../routes/index.ts";
import { createRouterBuilder } from "../createRouterBuilder.ts";

describe("blog", () => {
  const ref = Symbol("ref");

  const builder = createRouterBuilder()
    .add("/", ref)
    .addSegment("/post", (segmentBuilder) => {
      segmentBuilder.defaultRoute(ref, "postList");
      segmentBuilder.add("/:id.:slug", ref, "postView");
      segmentBuilder.addSegment("/search", (subSegmentBuilder) => {
        subSegmentBuilder.defaultRoute("refsearch", "search");
        subSegmentBuilder.add("/:term", ref, "search-results");
      });
      segmentBuilder.add("{/:tag}/:date{_:slug}", ref, "postWithTag");
    });

  const router = builder.createRouter();

  describe("routes", () => {
    const routes = builder.getRoutes();
    test("length", () => {
      expect(routes.length).toBe(2);
    });

    test("home", () => {
      const homeRoute = routes[0] as NotLocalizedEndRoute<any, any>;
      expect(homeRoute.path.path).toBe("/");
    });

    describe("post", () => {
      const postRouterRoute = routes[1] as NotLocalizedSegmentRoute<any, any>;
      const routePath = postRouterRoute.path;

      test("path", () => {
        expect(routePath).toHaveProperty("path", "/post");
        expect(routePath).toHaveProperty("completePath", "/post");
        expect(routePath.regExp).toEqual(/^(?:\/post)(?=\/|$)/);
      });

      describe("nested routes", () => {
        const { nestedRoutes } = postRouterRoute;

        test("/post should have 3 nested routes", () => {
          expect(nestedRoutes.length).toBe(3);
        });

        test("first nested route", () => {
          const nestedRoute = nestedRoutes[0] as NotLocalizedSegmentRoute<
            any,
            any
          >;
          expect(nestedRoute.path.path).toBe("/:id.:slug");
          expect(nestedRoute.path.completePath).toBe("/post/:id.:slug");
          expect(nestedRoute.path.regExp).toEqual(
            /^(?:\/(?=([^\/]+?)\.)(?:\1)\.([^\/]+))$/,
          );
        });
        test("third nested route", () => {
          const nestedRoute = nestedRoutes[2] as NotLocalizedSegmentRoute<
            any,
            any
          >;
          expect(nestedRoute.path.path).toBe("{/:tag}/:date{_:slug}");
          expect(nestedRoute.path.completePath).toBe(
            "/post{/:tag}/:date{_:slug}",
          );
          expect(nestedRoute.path.regExp).toEqual(
            /^(?:\/([^\/]+)\/(?=([^\/]+?)_)(?:\2)_([^\/]+)|\/([^\/]+)\/([^\/]+)|\/(?=([^\/]+?)_)(?:\6)_([^\/]+)|\/([^\/]+))$/,
          );
        });
      });

      test("default route", () => {
        const defaultRoute = postRouterRoute.defaultRoute!;

        expect(defaultRoute).toBeDefined();
        expect(defaultRoute.path).toHaveProperty("completePath", "/post");
        expect(defaultRoute.path).toHaveProperty("namedParams", []);
        expect(defaultRoute.path).toHaveProperty("path", "");
        expect(defaultRoute.path).toHaveProperty("regExp", /^(?:)$/);
        expect(defaultRoute.path).toHaveProperty("toPath");
      });
    });

    test("postView", () => {
      const rrPostView = router.get("postView") as NotLocalizedEndRoute<
        any,
        any
      >;
      expect(rrPostView.path.namedParams).toEqual(["id", "slug"]);
      expect(
        rrPostView.path.toPath({ id: "001", slug: "The-First-Post" }),
      ).toBe("/post/001.The-First-Post");
    });
  });

  describe("find", () => {
    test("postList", () => {
      const path = "/post";
      const match = router.find(path) as RouteMatch<never, unknown>;
      expect(match).toHaveProperty("path", path);
      expect(match).toHaveProperty("route", router.get("postList"));
      expect(match.namedParams).toBe(undefined);
    });

    test("postView", () => {
      const path = "/post/001.The-First-Post";
      const match = router.find(path) as RouteMatch<never, unknown>;
      expect(match).toHaveProperty("path", path);
      expect(match.namedParams).toEqual(
        new Map([
          ["id", "001"],
          ["slug", "The-First-Post"],
        ]),
      );
    });

    test("search", () => {
      const path = "/post/search";
      const match = router.find(path) as RouteMatch<never, unknown>;
      expect(match).toHaveProperty("path", path);
      const route: any = match.route;
      expect(route.path.completePath).toBe(
        (router.get("search") as NotLocalizedEndRoute<any, unknown>).path
          .completePath,
      );
      expect(match.ref).toBe("refsearch");
    });

    test("search", () => {
      const path = "/post/search/searchedterm";
      const match = router.find(path) as RouteMatch<never, unknown>;
      expect(match).toHaveProperty("path", path);
      expect(match).toHaveProperty("route", router.get("search-results"));
      expect(match.namedParams).toEqual(new Map([["term", "searchedterm"]]));
    });

    describe("ambiguous segments: first parameter stops at the first delimiter", () => {
      test.each([
        ["/post/42.my-slug", "postView", { id: "42", slug: "my-slug" }],
        ["/post/42.my.slug", "postView", { id: "42", slug: "my.slug" }],
        ["/post/4.2.slug", "postView", { id: "4", slug: "2.slug" }],
        ["/post/42..slug", "postView", { id: "42", slug: ".slug" }],
        ["/post/42.", "postWithTag", { date: "42." }],
        [
          "/post/2017-01-01_my_slug",
          "postWithTag",
          { date: "2017-01-01", slug: "my_slug" },
        ],
        [
          "/post/test/2017-01-01_my_slug",
          "postWithTag",
          { tag: "test", date: "2017-01-01", slug: "my_slug" },
        ],
        [
          "/post/test/2017_01_01",
          "postWithTag",
          { tag: "test", date: "2017", slug: "01_01" },
        ],
        [
          "/post/test/2017-01-01_",
          "postWithTag",
          { tag: "test", date: "2017-01-01_" },
        ],
      ])("%s", (path, routeKey, expectedParams) => {
        const match = router.find(path) as RouteMatch<never, unknown>;
        expect(match).toHaveProperty("route", router.get(routeKey));
        expect(Object.fromEntries(match.namedParams!)).toEqual(expectedParams);
      });
    });
  });

  describe("toPath", () => {
    test("first parameter containing the delimiter does not round-trip", () => {
      const path = router.toPath("postView", { id: "4.2", slug: "slug" });
      expect(path).toBe("/post/4.2.slug");
      expect(
        Object.fromEntries(
          (router.find(path) as RouteMatch<never, unknown>).namedParams!,
        ),
      ).toEqual({ id: "4", slug: "2.slug" });
    });

    test("last parameter containing the delimiter round-trips", () => {
      const path = router.toPath("postView", { id: "42", slug: "my.slug" });
      expect(path).toBe("/post/42.my.slug");
      expect(
        Object.fromEntries(
          (router.find(path) as RouteMatch<never, unknown>).namedParams!,
        ),
      ).toEqual({ id: "42", slug: "my.slug" });
    });

    test("empty string parameter throws", () => {
      expect(() => router.toPath("postView", { id: "", slug: "x" })).toThrow(
        new TypeError('Expected "id" to be a non-empty string'),
      );
    });
  });
});

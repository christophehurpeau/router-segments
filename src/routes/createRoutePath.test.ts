/* eslint-disable regexp/no-useless-non-capturing-group */
/* eslint-disable regexp/no-useless-escape */
import { describe, expect, test } from "vitest";
import { createRoutePath, createRoutePathSegment } from "./createRoutePath";

describe("createRoutePath", () => {
  test("/", () => {
    const routePath = createRoutePath("/", "/");
    expect(routePath).toHaveProperty("path", "/");
    expect(routePath).toHaveProperty("completePath", "/");
    expect(routePath.regExp).toEqual(/^(?:\/)$/);
    expect(routePath.namedParams).toEqual([]);
    expect(routePath.toPath()).toEqual("/");
  });

  test("/test/{*rest}", () => {
    const routePath = createRoutePath("/test/{*rest}", "/test/{*rest}");
    expect(routePath).toHaveProperty("path", "/test/{*rest}");
    expect(routePath).toHaveProperty("completePath", "/test/{*rest}");
    expect(routePath.regExp).toEqual(/^(?:\/test\/([\s\S]+)|\/test\/)$/);
    expect(routePath.namedParams).toEqual(["rest"]);
    expect(routePath.toPath({ rest: ["1", "2", "3"] })).toEqual("/test/1/2/3");
  });

  test("/segment/route", () => {
    const routePath = createRoutePath("/route", "/segment/route");
    expect(routePath).toHaveProperty("path", "/route");
    expect(routePath).toHaveProperty("completePath", "/segment/route");
    expect(routePath.regExp).toEqual(/^(?:\/route)$/);
    expect(routePath.namedParams).toEqual([]);
    expect(routePath.toPath()).toEqual("/segment/route");
  });

  test("/route/:namedParam", () => {
    const routePath = createRoutePath(
      "/route/:namedParam",
      "/route/:namedParam",
    );
    expect(routePath).toHaveProperty("path", "/route/:namedParam");
    expect(routePath).toHaveProperty("completePath", "/route/:namedParam");
    // eslint-disable-next-line no-useless-escape
    expect(routePath.regExp).toEqual(/^(?:\/route\/([^\/]+))$/);
    expect(routePath.namedParams).toEqual(["namedParam"]);
    expect(routePath.toPath({ namedParam: "test" })).toEqual("/route/test");
  });
});

describe("createRoutePathSegment", () => {
  test("/", () => {
    const routePath = createRoutePathSegment("/", "/");
    expect(routePath).toHaveProperty("path", "/");
    expect(routePath).toHaveProperty("completePath", "/");
    expect(routePath.regExp).toEqual(/^(?:\/)(?=\/|$)/);
    expect(routePath.namedParams).toEqual([]);
  });

  test("/segment/", () => {
    const routePath = createRoutePathSegment("/segment", "/segment");
    expect(routePath).toHaveProperty("path", "/segment");
    expect(routePath).toHaveProperty("completePath", "/segment");
    expect(routePath.regExp).toEqual(/^(?:\/segment)(?=\/|$)/);
    expect(routePath.namedParams).toEqual([]);
  });

  test("/segment/segment2/", () => {
    const routePath = createRoutePathSegment("/segment2", "/segment/segment2");
    expect(routePath).toHaveProperty("path", "/segment2");
    expect(routePath).toHaveProperty("completePath", "/segment/segment2");
    expect(routePath.regExp).toEqual(/^(?:\/segment2)(?=\/|$)/);
    expect(routePath.namedParams).toEqual([]);
  });

  test("/segment/:namedParam", () => {
    const routePath = createRoutePathSegment(
      "/segment/:namedParam",
      "/segment/:namedParam",
    );
    expect(routePath).toHaveProperty("path", "/segment/:namedParam");
    expect(routePath).toHaveProperty("completePath", "/segment/:namedParam");
    expect(routePath.regExp).toEqual(
      // eslint-disable-next-line no-useless-escape
      /^(?:\/segment\/([^\/]+))(?=\/|$)/,
    );
    expect(routePath.namedParams).toEqual(["namedParam"]);
    expect((routePath as any).toPath).not.toBeDefined();
  });
});

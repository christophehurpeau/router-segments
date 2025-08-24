import { describe, expect, test } from "vitest";
import type { NotLocalizedEndRoute } from "../routes";
import { createRouterBuilder } from "./createRouterBuilder";

test("home", () => {
  const builder = createRouterBuilder();
  const ref = Symbol("ref");

  builder.add("/", ref);

  const router = builder.createRouter();
  const rr = router.get("/") as NotLocalizedEndRoute<never, symbol>;
  expect(rr).toBeDefined();
  expect(rr.ref).toBe(ref);
  expect(rr.path.namedParams.length).toBe(0);
  expect(rr.path.regExp.source).toBe("^(?:\\/)$");
  expect(rr.path.toPath()).toBe("/");
});

test("should throw when key is used twice", () => {
  const ref = Symbol("ref");

  const builder = createRouterBuilder();

  builder.add("/path1", ref, "samekey");
  expect(() => {
    builder.add("/path1", ref, "samekey");
  }).toThrow('"samekey" is already used');
});

test("should throw when add localized is called but no locales were defined", () => {
  const ref = Symbol("ref");

  const builder = createRouterBuilder();

  expect(() => {
    builder.addLocalized({ en: "/path1" }, ref);
  }).toThrow("Invalid locales");
  expect(() => {
    builder.addLocalizedSegment({ en: "/path1" }, () => {});
  }).toThrow("Invalid locales");

  expect(() => {
    builder.addSegment("/path1", (segmentBuilder) => {
      segmentBuilder.addLocalized({ en: "/path2" }, ref);
    });
  }).toThrow("Invalid locales");

  expect(() => {
    builder.addSegment("/path1", (segmentBuilder) => {
      segmentBuilder.addLocalizedSegment({ en: "/path2" }, () => {});
    });
  }).toThrow("Invalid locales");
});

if (process.env.NODE_ENV !== "production") {
  test("should throw when no ref is provided", () => {
    const builder = createRouterBuilder(["en"]);

    expect(() => {
      builder.add("/", undefined);
    }).toThrow('Invalid ref: "undefined"');
    expect(() => {
      builder.add("/", null);
    }).toThrow('Invalid ref: "null"');

    expect(() => {
      builder.addLocalized({ en: "/" }, undefined);
    }).toThrow('Invalid ref: "undefined"');
    expect(() => {
      builder.addLocalized({ en: "/" }, null);
    }).toThrow('Invalid ref: "null"');
  });
}

describe("default key is path", () => {
  const ref = Symbol("ref");

  test("add", () => {
    const builder = createRouterBuilder();
    builder.add("/path1", ref);
    expect(builder.createRouter().get("/path1")).toBeDefined();
  });

  test("addLocalized", () => {
    const builder = createRouterBuilder(["en", "fr"]);
    builder.addLocalized({ en: "/en", fr: "/fr" }, ref);
    expect(builder.createRouter().get("/en")).toBeDefined();
  });

  test("segment add", () => {
    const builder = createRouterBuilder();
    builder.addSegment("/sgmt", (segmentBuilder) => {
      segmentBuilder.add("/path1", ref);
    });
    expect(builder.createRouter().get("/sgmt/path1")).toBeDefined();
  });

  test("segment addLocalized", () => {
    const builder = createRouterBuilder(["en", "fr"]);
    builder.addSegment("/sgmt", (segmentBuilder) => {
      segmentBuilder.addLocalized({ en: "/en", fr: "/fr" }, ref);
    });
    expect(builder.createRouter().get("/sgmt/en")).toBeDefined();
  });
});

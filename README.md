<h1 align="center">
  router-segments
</h1>

<p align="center">
  Router with segments
</p>

<p align="center">
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/npm/v/router-segments.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/npm/dw/router-segments.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/node/v/router-segments.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/npm/types/router-segments.svg?style=flat-square" alt="types"></a>
  <a href="https://codecov.io/gh/christophehurpeau/router-segments"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/router-segments/master.svg?style=flat-square"></a>
  <a href="https://christophehurpeau.github.io/router-segments/"><img src="https://img.shields.io/website.svg?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fchristophehurpeau.github.io%2Frouter-segments%2F?style=flat-square"></a>
</p>

### Why another router ?

This router take full advantages of segments, building a tree of regexp to avoid having 500 regexp calls for one route.

### How to use

router-segments uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) for matching the route paths,
also used by [expressjs](https://expressjs.com/en/guide/routing.html), [koa-router](https://www.npmjs.com/package/koa-router)
and many other routers.

```js
import { createRouterBuilder } from "router-segments";

const builder = createRouterBuilder();

builder.add("/", ref);
builder.addSegment("/post", (segmentBuilder) => {
  segmentBuilder.add("/:id(\\d+)-:slug([A-Za-z\\-]+)", ref, "/post/view");
  segmentBuilder.defaultRoute(ref, "/post");
});

export default builder.createRouter();
```

#### Url Generator

[path-to-regexp documentation](https://www.npmjs.com/package/path-to-regexp#compile-reverse-path-to-regexp)

```js
router.toPath("/post/view", { id: "001", slug: "a-slug" });
// /post/001-a-slug
```

## Localized routes

```js
import { createRouterBuilder } from "router-segments";

const builder = createRouterBuilder(["en", "fr"]);

builder.add("/", ref);
builder.addLocalizedSegment(
  {
    en: "/my-blog",
    fr: "/mon-blog",
  },
  (segmentBuilder) => {
    segmentBuilder.addLocalized(
      {
        en: "/post/:id(\\d+)",
        fr: "/billet/:id(\\d+)",
      },
      ref,
      "/my-blog/post",
    );
    segmentBuilder.defaultRoute(ref, "/my-blog");
  },
);

export const router = builder.createRouter();
```

## API

see [Definition file](https://github.com/christophehurpeau/router-segments/tree/master/dist/index.d.ts)

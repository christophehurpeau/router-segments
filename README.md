<h3 align="center">
  router-segments
</h3>

<p align="center">
  Router with segments
</p>

<p align="center">
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/npm/v/router-segments.svg?style=flat-square"></a>
  <a href="https://circleci.com/gh/christophehurpeau/router-segments"><img src="https://img.shields.io/circleci/project/christophehurpeau/router-segments/master.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/router-segments"><img src="https://david-dm.org/christophehurpeau/router-segments.svg?style=flat-square"></a>
  <a href="https://dependencyci.com/github/christophehurpeau/router-segments"><img src="https://dependencyci.com/github/christophehurpeau/router-segments/badge?style=flat-square"></a>
  <a href="https://codecov.io/gh/christophehurpeau/router-segments"><img src="https://img.shields.io/codecov/c/github/christophehurpeau/router-segments/master.svg?style=flat-square"></a>
</p>

### Why another router ?

This router take full advantages of segments, building a tree of regexp to avoid having 500 regexp calls for one route.


### How to use

router-segments uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) for matching the route paths,
also used by [expressjs](https://expressjs.com/en/guide/routing.html), [koa-router](https://www.npmjs.com/package/koa-router)
and many other routers.

```js
import createBuilder from 'router-segments';
import type { SegmentRouterBuilderType } from 'router-segments/types'; // with flow-runtime


const builder = createBuilder();

builder.add('/', ref);
builder.addSegment('/post', (segmentBuilder: SegmentRouterBuilderType) => {
  segmentBuilder.add('/:id(\\d+)-:slug([A-Za-z\\-]+)', ref, '/post/view');
  segmentBuilder.defaultRoute(ref, '/post');
});

export default builder.createRouter();
```

#### Url Generator

[path-to-regexp documentation](https://www.npmjs.com/package/path-to-regexp#compile-reverse-path-to-regexp)

```js
router.toPath('/post/view', { id: '001', slug: 'a-slug' });
// /post/001-a-slug

```

## Localized routes

     
```js
import createBuilder from 'router-segments';
import type { SegmentRouterBuilderType } from 'router-segments/types'; // with flow-runtime


const builder = createBuilder(['en', 'fr']);

builder.add('/', ref);
builder.addLocalizedSegment(
  {
    en: '/my-blog',
    fr: '/mon-blog',
  },
  (segmentBuilder: SegmentRouterBuilderType) => {
    segmentBuilder.addLocalized({
      en: '/post/:id(\\d+)',
      fr: '/billet/:id(\\d+)',
    }, ref, '/my-blog/post');
    segmentBuilder.defaultRoute(ref, '/my-blog');
  },
);

export default builder.createRouter();
```

## API

```js
type RouteMapType = Map<string, RouteType>;
type RoutesType = Array<RouteType>;
type RouteRefType = any;

type RouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  addLocalizedSegment: (localizedPaths: PathDictionaryType, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  getRoutes: () => RoutesType,
  createRouter: () => RouterType,
|};

type SegmentRouterBuilderType = {|
  defaultRoute: (ref: RouteRefType, key: ?string) => void,
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
  addLocalizedSegment: (localizedPaths: PathDictionaryType, buildSegment: (builder: SegmentRouterBuilderType) => void) => void,
|};

type RouterType = {|
  get: (path: string) => ?RouteType,
  find: (path: string) => ?RouteMatchType,
  toPath: (key: string, args: any) => string,
  toLocalizedPath: (locale: string, key: string, args: any) => string,
|};

type RouteMatchType = {|
  ref: RouteRefType,
  path: string,
  routePath: RoutePathType,
  namedParams: ?Map<string, string>,
  otherParams: ?Array<string>,
|};


```

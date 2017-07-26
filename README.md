# router-segments [![NPM version][npm-image]][npm-url]

Router with segments

[![Build Status][circleci-status-image]][circleci-status-url]
[![Travis Status][travisci-status-image]][travisci-status-url]
[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coverage-image]][coverage-url]

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
type SegmentCallbackType = (builder: SegmentRouterBuilderType) => void;  
type RouteMapType = Map<string, RouteType>;
type RoutesType = Array<RouteType>;
type RouteRefType = any;

type RouterBuilderType = {|
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: SegmentRouterBuilderType) => void,
  addLocalizedSegment: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  getRoutes: () => RoutesType,
  createRouter: () => RouterType,
|};

type SegmentRouterBuilderType = {|
  defaultRoute: (ref: RouteRefType, key: ?string) => void,
  add: (path: string, ref: RouteRefType, key: ?string) => void,
  addLocalized: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
  addSegment: (path: string, buildSegment: SegmentRouterBuilderType) => void,
  addLocalizedSegment: (localizedPath: PathDictionaryType, ref: RouteRefType, key: ?string) => void,
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

[npm-image]: https://img.shields.io/npm/v/router-segments.svg?style=flat-square
[npm-url]: https://npmjs.org/package/router-segments
[daviddm-image]: https://david-dm.org/christophehurpeau/router-segments.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/router-segments
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/router-segments/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/router-segments
[circleci-status-image]: https://img.shields.io/circleci/project/christophehurpeau/router-segments/master.svg?style=flat-square
[circleci-status-url]: https://circleci.com/gh/christophehurpeau/router-segments
[travisci-status-image]: https://img.shields.io/travis/christophehurpeau/router-segments/master.svg?style=flat-square
[travisci-status-url]: https://travis-ci.org/christophehurpeau/router-segments
[coverage-image]: https://img.shields.io/codecov/c/github/christophehurpeau/router-segments/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/christophehurpeau/router-segments
[docs-coverage-url]: https://christophehurpeau.github.io/router-segments/coverage/lcov-report/

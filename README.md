<h3 align="center">
  router-segments
</h3>

<p align="center">
  Router with segments
</p>

<p align="center">
  <a href="https://npmjs.org/package/router-segments"><img src="https://img.shields.io/npm/v/router-segments.svg?style=flat-square"></a>
</p>

### Why another router ?

This router take full advantages of segments, building a tree of regexp to avoid having 500 regexp calls for one route.

### How to use

router-segments uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) for matching the route paths,
also used by [expressjs](https://expressjs.com/en/guide/routing.html), [koa-router](https://www.npmjs.com/package/koa-router)
and many other routers.

```js
import createBuilder from 'router-segments';

const builder = createBuilder();

builder.add('/', ref);
builder.addSegment('/post', (segmentBuilder) => {
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

const builder = createBuilder(['en', 'fr']);

builder.add('/', ref);
builder.addLocalizedSegment(
  {
    en: '/my-blog',
    fr: '/mon-blog',
  },
  (segmentBuilder) => {
    segmentBuilder.addLocalized(
      {
        en: '/post/:id(\\d+)',
        fr: '/billet/:id(\\d+)',
      },
      ref,
      '/my-blog/post',
    );
    segmentBuilder.defaultRoute(ref, '/my-blog');
  },
);

export default builder.createRouter();
```

## API

see [Definition file](https://github.com/christophehurpeau/router-segments/tree/master/dist/index.d.ts)

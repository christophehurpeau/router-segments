/* eslint-disable unicorn/better-regex, unicorn/no-unsafe-regex */
import type { RouteMatch } from '../../router/findMatch';
import type {
  NotLocalizedEndRoute,
  NotLocalizedSegmentRoute,
} from '../../routes';
import { createRouterBuilder } from '../createRouterBuilder';

describe('blog', () => {
  const ref = Symbol('ref');

  const builder = createRouterBuilder();

  builder.add('/', ref);
  builder.addSegment('/post', (segmentBuilder) => {
    segmentBuilder.defaultRoute(ref, 'postList');
    segmentBuilder.add('/:id(\\d+)-:slug([A-Za-z\\-]+)', ref, 'postView');
    segmentBuilder.add(
      '/:tag?/:date(\\d{4}\\-\\d{2}\\-\\d{2})_:slug',
      ref,
      'postWithTag',
    );
    segmentBuilder.addSegment('/search', (segmentBuilder) => {
      segmentBuilder.defaultRoute('refsearch', 'search');
      segmentBuilder.add('/:term', ref, 'search-results');
    });
  });

  const router = builder.createRouter();

  describe('routes', () => {
    const routes = builder.getRoutes();
    test('length', () => {
      expect(routes.length).toBe(2);
    });

    test('home', () => {
      const homeRoute = routes[0] as NotLocalizedEndRoute;
      expect(homeRoute.path.path).toBe('/');
    });

    describe('post', () => {
      const postRouterRoute: NotLocalizedSegmentRoute = routes[1] as NotLocalizedSegmentRoute;
      const routePath = postRouterRoute.path;

      test('path', () => {
        expect(routePath).toHaveProperty('path', '/post');
        expect(routePath).toHaveProperty('completePath', '/post');
        expect(routePath.regExp).toEqual(/^\/post(?:\/((?:.+)))?$/);
      });

      describe('nested routes', () => {
        const { nestedRoutes } = postRouterRoute;

        test('/post should have 3 nested routes', () => {
          expect(nestedRoutes.length).toBe(3);
        });

        test('first nested route', () => {
          const nestedRoute: NotLocalizedEndRoute = nestedRoutes[0] as NotLocalizedEndRoute;
          expect(nestedRoute.path.path).toBe('/:id(\\d+)-:slug([A-Za-z\\-]+)');
          expect(nestedRoute.path.completePath).toBe(
            '/post/:id(\\d+)-:slug([A-Za-z\\-]+)',
          );
          expect(nestedRoute.path.regExp).toEqual(
            // eslint-disable-next-line no-useless-escape
            /^\/((?:\d+))-((?:[A-Za-z\-]+))$/,
          );
        });
        test('second nested route', () => {
          const nestedRoute: NotLocalizedEndRoute = nestedRoutes[1] as NotLocalizedEndRoute;
          expect(nestedRoute.path.path).toBe(
            '/:tag?/:date(\\d{4}\\-\\d{2}\\-\\d{2})_:slug',
          );
          expect(nestedRoute.path.completePath).toBe(
            '/post/:tag?/:date(\\d{4}\\-\\d{2}\\-\\d{2})_:slug',
          );
          expect(nestedRoute.path.regExp).toEqual(
            // eslint-disable-next-line no-useless-escape
            /^(?:\/((?:[^\/]+?)))?\/((?:\d{4}\-\d{2}\-\d{2}))_((?:[^\/]+?))$/,
          );
        });
      });

      test('default route', () => {
        const defaultRoute: NotLocalizedEndRoute = postRouterRoute.defaultRoute as NotLocalizedEndRoute;

        expect(defaultRoute).toBeDefined();
        expect(defaultRoute.path).toHaveProperty('completePath', '/post');
        expect(defaultRoute.path).toHaveProperty('namedParams', []);
        expect(defaultRoute.path).toHaveProperty('path', '');
        expect(defaultRoute.path).toHaveProperty('regExp', /^$/);
        expect(defaultRoute.path).toHaveProperty('toPath');
      });
    });

    test('postView', () => {
      const rrPostView = router.get('postView') as NotLocalizedEndRoute;
      expect(rrPostView.path.namedParams).toEqual(['id', 'slug']);
      expect(
        rrPostView.path.toPath({ id: '001', slug: 'The-First-Post' }),
      ).toBe('/post/001-The-First-Post');
    });
  });

  describe('find', () => {
    test('postList', () => {
      const path = '/post';
      const match = router.find(path) as RouteMatch<never>;
      expect(match).toHaveProperty('path', path);
      expect(match).toHaveProperty('route', router.get('postList'));
      expect(match.namedParams).toBe(undefined);
      expect(match.otherParams).toBe(undefined);
    });

    test('postView', () => {
      const path = '/post/001-The-First-Post';
      const match = router.find(path) as RouteMatch<never>;
      expect(match).toHaveProperty('path', path);
      expect(match.namedParams).toEqual(
        new Map([
          ['id', '001'],
          ['slug', 'The-First-Post'],
        ]),
      );
      expect(match.otherParams).toBe(undefined);
    });

    test('search', () => {
      const path = '/post/search';
      const match = router.find(path) as RouteMatch<never>;
      expect(match).toHaveProperty('path', path);
      const route: any = match.route;
      expect(route.path.completePath).toBe(
        (router.get('search') as NotLocalizedEndRoute).path.completePath,
      );
      expect(match.ref).toBe('refsearch');
    });

    test('search', () => {
      const path = '/post/search/searchedterm';
      const match = router.find(path) as RouteMatch<never>;
      expect(match).toHaveProperty('path', path);
      expect(match).toHaveProperty('route', router.get('search-results'));
      expect(match.namedParams).toEqual(new Map([['term', 'searchedterm']]));
    });
  });
});

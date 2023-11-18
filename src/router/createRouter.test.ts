import { createRoute, createLocalizedRoute } from '../routes/create';
import type { EndRoute } from '../routes/interfaces';
import { createRouter } from './createRouter';

const ref = Symbol('ref');
const route = createRoute('/', '/', ref);
const localizedPathsRecord = { en: '/posts', fr: '/articles' };
const localizedRoute = createLocalizedRoute(
  localizedPathsRecord,
  localizedPathsRecord,
  ref,
);
const router = createRouter(
  [route, localizedRoute],
  new Map<string, EndRoute<keyof typeof localizedPathsRecord, symbol>>([
    ['/', route],
    ['/blog', localizedRoute],
  ]),
);

test('get by key should return route', () => {
  expect(router.get('/')).toBe(route);
});

test('find should return route match', () => {
  const match = router.find('/');
  expect(match?.routePath).toBe(route.path);
});

test('toPath should return url', () => {
  expect(router.toPath('/')).toBe('/');
});

test('toLocalizedPath should return url', () => {
  expect(router.toLocalizedPath('fr', '/blog')).toBe('/articles');
});

import createRouter from './createRouter';
import { createRoute, createLocalizedRoute } from '../routes/create';

const ref = Symbol('ref');
const route = createRoute('/', '/', ref);
const blogPathDictionary = { en: '/posts', fr: '/articles' };
const localizedRoute = createLocalizedRoute(blogPathDictionary, blogPathDictionary, ref);
const router = createRouter(
  [route, localizedRoute],
  new Map([['/', route], ['/blog', localizedRoute]]),
);

test('get by key should return route', () => {
  expect(router.get('/')).toBe(route);
});

test('find should return route match', () => {
  expect(router.find('/').routePath).toBe(route.path);
});

test('toPath should return url', () => {
  expect(router.toPath('/')).toBe('/');
});

test('toLocalizedPath should return url', () => {
  expect(router.toLocalizedPath('fr', '/blog')).toBe('/articles');
});

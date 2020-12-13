import { LocalizedEndRoute } from '../routes';
import { createSegmentRoute, createRoute } from '../routes/create';
import type { Routes } from '../types';
import type { RouteMatch } from './findMatch';
import findMatch from './findMatch';

test('find without routes returns null', () => {
  const routes: Routes<never> = [];
  expect(findMatch('/', routes)).toBe(null);
});

test('unknown localized route', () => {
  const ref = Symbol('ref');
  const routes = [new LocalizedEndRoute(new Map(), ref)];
  const findUnknownLocalizedMatch = () => findMatch('/', routes, 'it');
  if (process.env.NODE_ENV === 'production') {
    expect(findUnknownLocalizedMatch).toThrow();
  } else {
    expect(findUnknownLocalizedMatch).toThrow(
      'Unknown localized route for locale it',
    );
  }
});

test('find match segment without default route', () => {
  const routes = [createSegmentRoute('/post', '/post')];
  expect(findMatch('/post', routes)).toBe(null);
});

test('find segments with multiple named params', () => {
  const rootSegment = createSegmentRoute('/:param1', '/:param1');
  const routes = [rootSegment];

  const nestedSegment = createSegmentRoute('/:param2', '/:param1/:param2');
  rootSegment.nestedRoutes.push(nestedSegment);

  const ref = Symbol('ref');
  nestedSegment.defaultRoute = createRoute('', '/:param1/:param2', ref);

  const match = findMatch('/1/2', routes) as RouteMatch<never>;
  expect(match).toBeDefined();
  expect(match.path).toBe('/1/2');
  expect(match.namedParams).toEqual(
    new Map([
      ['param1', '1'],
      ['param2', '2'],
    ]),
  );
});

describe('find with /*', () => {
  const ref = Symbol('ref');
  const routes = [createRoute('/test/*', '/test/*', ref)];

  test('/test/', () => {
    const match = findMatch('/test/', routes) as RouteMatch<never>;
    expect(match).toBeDefined();
    expect(match.namedParams).toBe(undefined);
    expect(match.otherParams).toEqual([]);
  });

  test('/test/1', () => {
    const match = findMatch('/test/1', routes) as RouteMatch<never>;
    expect(match).toBeDefined();
    expect(match.path).toBe('/test/1');
    expect(match.namedParams).toBe(undefined);
    expect(match.otherParams).toEqual(['1']);
  });

  test('/test/1/2', () => {
    const match = findMatch('/test/1/2', routes) as RouteMatch<never>;
    expect(match).toBeDefined();
    expect(match.path).toBe('/test/1/2');
    expect(match.namedParams).toBe(undefined);
    expect(match.otherParams).toEqual(['1', '2']);
  });
});

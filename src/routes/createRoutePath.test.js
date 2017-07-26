import { createRoutePath, createRoutePathSegment } from './createRoutePath';

describe('createRoutePath', () => {
  test('/', () => {
    const routePath = createRoutePath('/', '/');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/');
    expect(routePath.completePath).toBe('/');
    expect(routePath.regExp).toEqual(/^\/$/);
    expect(routePath.namedParams).toEqual([]);
    expect(routePath.toPath()).toEqual('/');
  });

  test('/test/*', () => {
    const routePath = createRoutePath('/test/*', '/test/*');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/test/*');
    expect(routePath.completePath).toBe('/test/*');
    expect(routePath.regExp).toEqual(/^\/test\/((?:.*))$/);
    expect(routePath.namedParams).toEqual([]);
    expect(routePath.toPath({ 0: '1/2/3' })).toEqual('/test/1/2/3');
  });

  test('/segment/route', () => {
    const routePath = createRoutePath('/route', '/segment/route');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/route');
    expect(routePath.completePath).toBe('/segment/route');
    expect(routePath.regExp).toEqual(/^\/route$/);
    expect(routePath.namedParams).toEqual([]);
    expect(routePath.toPath()).toEqual('/segment/route');
  });

  test('/route/:namedParam', () => {
    const routePath = createRoutePath('/route/:namedParam', '/route/:namedParam');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/route/:namedParam');
    expect(routePath.completePath).toBe('/route/:namedParam');
    expect(routePath.regExp).toEqual(/^\/route\/((?:[^/]+?))$/);
    expect(routePath.namedParams).toEqual(['namedParam']);
    expect(routePath.toPath({ namedParam: 'test' })).toEqual('/route/test');
  });
});

describe('createRoutePathSegment', () => {
  test('/', () => {
    const routePath = createRoutePathSegment('/', '/');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/');
    expect(routePath.completePath).toBe('/');
    expect(routePath.regExp).toEqual(/^\/(?:\/((?:.+)))?$/);
    expect(routePath.namedParams).toEqual([]);
  });

  test('/segment/', () => {
    const routePath = createRoutePathSegment('/segment', '/segment');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/segment');
    expect(routePath.completePath).toBe('/segment');
    expect(routePath.regExp).toEqual(/^\/segment(?:\/((?:.+)))?$/);
    expect(routePath.namedParams).toEqual([]);
  });

  test('/segment/segment2/', () => {
    const routePath = createRoutePathSegment('/segment2', '/segment/segment2');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/segment2');
    expect(routePath.completePath).toBe('/segment/segment2');
    expect(routePath.regExp).toEqual(/^\/segment2(?:\/((?:.+)))?$/);
    expect(routePath.namedParams).toEqual([]);
  });

  test('/segment/:namedParam', () => {
    const routePath = createRoutePathSegment('/segment/:namedParam', '/segment/:namedParam');
    expect(routePath).toBeDefined();
    expect(routePath.path).toBe('/segment/:namedParam');
    expect(routePath.completePath).toBe('/segment/:namedParam');
    expect(routePath.regExp).toEqual(/^\/segment\/((?:[^/]+?))(?:\/((?:.+)))?$/);
    expect(routePath.namedParams).toEqual(['namedParam']);
    expect(routePath.toPath).not.toBeDefined();
  });
});

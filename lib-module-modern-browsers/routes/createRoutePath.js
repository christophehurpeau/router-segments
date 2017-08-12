import pathToRegExp from 'path-to-regexp';


const internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath)
  };
};

export const createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};

export const createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};
//# sourceMappingURL=createRoutePath.js.map
import pathToRegExp from 'path-to-regexp';


const internalCreateRoutePath = (path, completePath, segment) => {
  const keys = [];
  const regExp = pathToRegExp(segment ? `${path}/(.+)?` : path, keys, {
    sensitive: true,
    strict: true
  });
  const namedParams = keys.map(key => key.name).filter(Boolean);

  if (segment) return { path, completePath, regExp, namedParams };

  return {
    path,
    completePath,
    regExp,
    namedParams,
    toPath: pathToRegExp.compile(completePath)
  };
};

export const createRoutePathSegment = (path, completePath) => internalCreateRoutePath(path, completePath, true);

export const createRoutePath = (path, completePath) => internalCreateRoutePath(path, completePath, false);
//# sourceMappingURL=createRoutePath.js.map
import pathToRegExp from 'path-to-regexp';


var internalCreateRoutePath = function internalCreateRoutePath(path, completePath, segment) {
  var keys = [];
  var regExp = pathToRegExp(segment ? path + '/(.+)?' : path, keys, {
    sensitive: true,
    strict: true
  });
  var namedParams = keys.map(function (key) {
    return key.name;
  }).filter(Boolean);

  if (segment) return { path: path, completePath: completePath, regExp: regExp, namedParams: namedParams };

  return {
    path: path,
    completePath: completePath,
    regExp: regExp,
    namedParams: namedParams,
    toPath: pathToRegExp.compile(completePath)
  };
};

export var createRoutePathSegment = function createRoutePathSegment(path, completePath) {
  return internalCreateRoutePath(path, completePath, true);
};

export var createRoutePath = function createRoutePath(path, completePath) {
  return internalCreateRoutePath(path, completePath, false);
};
//# sourceMappingURL=createRoutePath.js.map
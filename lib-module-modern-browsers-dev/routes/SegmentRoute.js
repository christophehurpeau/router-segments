var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['keys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['defineProperty'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper() {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { RoutePathType as _RoutePathType } from '../types';
import _Route from './EndRoute';

import t from 'flow-runtime';
const Route = t.tdz(function () {
  return _Route;
});
const RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
let SegmentRoute = (_dec = t.decorate(t.ref(RoutePathType)), _dec2 = t.decorate(t.nullable(t.ref(Route))), (_class = class {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  constructor(path) {
    _initDefineProp(this, 'path', _descriptor, this);

    this.nestedRoutes = [];

    _initDefineProp(this, 'defaultRoute', _descriptor2, this);

    let _pathType = t.ref(RoutePathType);

    t.param('path', _pathType).assert(path);

    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    const _returnType = t.return(t.ref(RoutePathType));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'path', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'defaultRoute', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
export { SegmentRoute as default };
//# sourceMappingURL=SegmentRoute.js.map
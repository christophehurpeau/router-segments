var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

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
const Route = t.tdz(() => _Route);
const RoutePathType = t.tdz(() => _RoutePathType);
let SegmentRoute = (_dec = t.annotate(t.class('SegmentRoute', SegmentRoute => {
  return [t.property('path', t.ref(RoutePathType)), t.property('nestedRoutes', t.array(t.union(t.ref(Route), t.ref(SegmentRoute)))), t.property('defaultRoute', t.nullable(t.ref(Route))), t.method('constructor', t.param('path', t.ref(RoutePathType))), t.method('freeze'), t.method('getPath', t.return(t.ref(RoutePathType))), t.method('isSegment', t.return(t.boolean())), t.method('toJSON'), t.method('toString')];
})), _dec2 = t.decorate(t.ref(RoutePathType)), _dec3 = t.decorate(function () {
  return t.array(t.union(t.ref(Route), t.ref(SegmentRoute)));
}), _dec4 = t.decorate(t.nullable(t.ref(Route))), _dec(_class = (_class2 = class {

  constructor(path) {
    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'nestedRoutes', _descriptor2, this);

    _initDefineProp(this, 'defaultRoute', _descriptor3, this);

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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'path', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'nestedRoutes', [_dec3], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'defaultRoute', [_dec4], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);
export { SegmentRoute as default };
//# sourceMappingURL=SegmentRoute.js.map
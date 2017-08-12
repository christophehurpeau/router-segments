var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

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

import { LocaleType as _LocaleType, RoutePathType as _RoutePathType } from '../types';
import _LocalizedRoute from './LocalizedEndRoute';

import t from 'flow-runtime';
const LocalizedRoute = t.tdz(function () {
  return _LocalizedRoute;
});
const LocaleType = t.tdz(function () {
  return _LocaleType;
});
const RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
let LocalizedSegmentRoute = (_dec = t.decorate(t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), _dec2 = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _dec3 = t.decorate(t.nullable(t.ref(LocalizedRoute))), (_class = class {

  constructor(localizedPaths) {
    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'nestedRoutes', _descriptor2, this);

    _initDefineProp(this, 'defaultRoute', _descriptor3, this);

    let _localizedPathsType = t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType));

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

    this.localizedPaths = localizedPaths;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType);

    const _returnType = t.return(t.nullable(t.ref(RoutePathType)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(true);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'localizedPaths', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'nestedRoutes', [_dec2], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'defaultRoute', [_dec3], {
  enumerable: true,
  initializer: null
})), _class));
export { LocalizedSegmentRoute as default };
//# sourceMappingURL=LocalizedSegmentRoute.js.map
var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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

import { LocaleType as _LocaleType, RoutePathType as _RoutePathType, RouteRefType as _RouteRefType } from '../types';

import t from 'flow-runtime';
const LocaleType = t.tdz(() => _LocaleType);
const RoutePathType = t.tdz(() => _RoutePathType);
const RouteRefType = t.tdz(() => _RouteRefType);
let LocalizedEndRoute = (_dec = t.annotate(t.class('LocalizedEndRoute', t.property('localizedPaths', t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), t.property('ref', t.ref(RouteRefType)), t.method('constructor', t.param('localizedPaths', t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), t.param('ref', t.ref(RouteRefType))), t.method('getPath', t.param('locale', t.ref(LocaleType)), t.return(t.nullable(t.ref(RoutePathType)))), t.method('isSegment', t.return(t.boolean())), t.method('toJSON'), t.method('toString'))), _dec2 = t.decorate(t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), _dec3 = t.decorate(t.ref(RouteRefType)), _dec(_class = (_class2 = class {

  constructor(localizedPaths, ref) {
    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    let _localizedPathsType = t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType));

    let _refType = t.ref(RouteRefType);

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
    t.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    let _localeType = t.ref(LocaleType);

    const _returnType = t.return(t.nullable(t.ref(RoutePathType)));

    t.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = t.return(t.boolean());

    return _returnType2.assert(false);
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'localizedPaths', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'ref', [_dec3], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);
export { LocalizedEndRoute as default };
//# sourceMappingURL=LocalizedEndRoute.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

var _types = require('../types');

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const LocaleType = _flowRuntime2.default.tdz(() => _types.LocaleType);

const RoutePathType = _flowRuntime2.default.tdz(() => _types.RoutePathType);

const RouteRefType = _flowRuntime2.default.tdz(() => _types.RouteRefType);

let LocalizedEndRoute = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.ref('Map', _flowRuntime2.default.ref(LocaleType), _flowRuntime2.default.ref(RoutePathType))), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RouteRefType)), (_class = class {

  constructor(localizedPaths, ref) {
    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    let _localizedPathsType = _flowRuntime2.default.ref('Map', _flowRuntime2.default.ref(LocaleType), _flowRuntime2.default.ref(RoutePathType));

    let _refType = _flowRuntime2.default.ref(RouteRefType);

    _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

    _flowRuntime2.default.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    let _localeType = _flowRuntime2.default.ref(LocaleType);

    const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RoutePathType)));

    _flowRuntime2.default.param('locale', _localeType).assert(locale);

    return _returnType.assert(this.localizedPaths.get(locale));
  }

  isSegment() {
    const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

    return _returnType2.assert(false);
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
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'ref', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = LocalizedEndRoute;
//# sourceMappingURL=LocalizedEndRoute.js.map
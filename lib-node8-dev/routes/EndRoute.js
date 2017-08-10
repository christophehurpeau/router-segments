'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

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

const RoutePathType = _flowRuntime2.default.tdz(() => _types.RoutePathType);

const RouteRefType = _flowRuntime2.default.tdz(() => _types.RouteRefType);

let EndRoute = (_dec = _flowRuntime2.default.annotate(_flowRuntime2.default.class('EndRoute', _flowRuntime2.default.property('path', _flowRuntime2.default.ref(RoutePathType)), _flowRuntime2.default.property('ref', _flowRuntime2.default.ref(RouteRefType)), _flowRuntime2.default.method('constructor', _flowRuntime2.default.param('path', _flowRuntime2.default.ref(RoutePathType)), _flowRuntime2.default.param('ref', _flowRuntime2.default.ref(RouteRefType))), _flowRuntime2.default.method('getPath', _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType))), _flowRuntime2.default.method('isSegment', _flowRuntime2.default.return(_flowRuntime2.default.boolean())), _flowRuntime2.default.method('toJSON'), _flowRuntime2.default.method('toString'))), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RoutePathType)), _dec3 = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RouteRefType)), _dec(_class = (_class2 = class {

  constructor(path, ref) {
    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    let _pathType = _flowRuntime2.default.ref(RoutePathType);

    let _refType = _flowRuntime2.default.ref(RouteRefType);

    _flowRuntime2.default.param('path', _pathType).assert(path);

    _flowRuntime2.default.param('ref', _refType).assert(ref);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath() {
    const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

    return _returnType2.assert(false);
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
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'ref', [_dec3], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);
exports.default = EndRoute;
//# sourceMappingURL=EndRoute.js.map
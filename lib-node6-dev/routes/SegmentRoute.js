'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _types = require('../types');

var _EndRoute = require('./EndRoute');

var _EndRoute2 = _interopRequireDefault(_EndRoute);

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

const Route = _flowRuntime2.default.tdz(() => _EndRoute2.default);

const RoutePathType = _flowRuntime2.default.tdz(() => _types.RoutePathType);

let SegmentRoute = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RoutePathType)), _dec2 = _flowRuntime2.default.decorate(function () {
  return _flowRuntime2.default.array(_flowRuntime2.default.union(_flowRuntime2.default.ref(Route), _flowRuntime2.default.ref(SegmentRoute)));
}), _dec3 = _flowRuntime2.default.decorate(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(Route))), (_class = class {

  constructor(path) {
    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'nestedRoutes', _descriptor2, this);

    _initDefineProp(this, 'defaultRoute', _descriptor3, this);

    let _pathType = _flowRuntime2.default.ref(RoutePathType);

    _flowRuntime2.default.param('path', _pathType).assert(path);

    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    const _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

    return _returnType.assert(this.path);
  }

  isSegment() {
    const _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

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
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'nestedRoutes', [_dec2], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'defaultRoute', [_dec3], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = SegmentRoute;
//# sourceMappingURL=SegmentRoute.js.map
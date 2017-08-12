'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var RoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.RoutePathType;
});

var RouteRefType = _flowRuntime2.default.tdz(function () {
  return _types.RouteRefType;
});

var EndRoute = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RoutePathType)), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RouteRefType)), (_class = function () {
  function EndRoute(path, ref) {
    _classCallCheck(this, EndRoute);

    _initDefineProp(this, 'path', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    var _pathType = _flowRuntime2.default.ref(RoutePathType);

    var _refType = _flowRuntime2.default.ref(RouteRefType);

    _flowRuntime2.default.param('path', _pathType).assert(path);

    _flowRuntime2.default.param('ref', _refType).assert(ref);

    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  _createClass(EndRoute, [{
    key: 'getPath',
    value: function getPath() {
      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

      return _returnType.assert(this.path);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

      return _returnType2.assert(false);
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.path;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return EndRoute;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'path', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'ref', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = EndRoute;
//# sourceMappingURL=EndRoute.js.map
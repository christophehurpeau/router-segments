'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

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

var Route = _flowRuntime2.default.tdz(function () {
  return _EndRoute2.default;
});

var RoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.RoutePathType;
});

var SegmentRoute = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.ref(RoutePathType)), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(Route))), (_class = function () {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  function SegmentRoute(path) {
    _classCallCheck(this, SegmentRoute);

    _initDefineProp(this, 'path', _descriptor, this);

    this.nestedRoutes = [];

    _initDefineProp(this, 'defaultRoute', _descriptor2, this);

    var _pathType = _flowRuntime2.default.ref(RoutePathType);

    _flowRuntime2.default.param('path', _pathType).assert(path);

    this.path = path;
  }

  _createClass(SegmentRoute, [{
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this);
      Object.freeze(this.nestedRoutes);
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.ref(RoutePathType));

      return _returnType.assert(this.path);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = _flowRuntime2.default.return(_flowRuntime2.default.boolean());

      return _returnType2.assert(true);
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

  return SegmentRoute;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'path', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'defaultRoute', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = SegmentRoute;
//# sourceMappingURL=SegmentRoute.js.map
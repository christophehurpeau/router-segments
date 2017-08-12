'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3;

var _types = require('../types');

var _LocalizedEndRoute = require('./LocalizedEndRoute');

var _LocalizedEndRoute2 = _interopRequireDefault(_LocalizedEndRoute);

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

var LocalizedRoute = _flowRuntime2.default.tdz(function () {
  return _LocalizedEndRoute2.default;
});

var LocaleType = _flowRuntime2.default.tdz(function () {
  return _types.LocaleType;
});

var RoutePathType = _flowRuntime2.default.tdz(function () {
  return _types.RoutePathType;
});

var LocalizedSegmentRoute = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.ref('Map', _flowRuntime2.default.ref(LocaleType), _flowRuntime2.default.ref(RoutePathType))), _dec2 = _flowRuntime2.default.decorate(function () {
  return _flowRuntime2.default.array(_flowRuntime2.default.union(_flowRuntime2.default.ref(LocalizedRoute), _flowRuntime2.default.ref(LocalizedSegmentRoute)));
}), _dec3 = _flowRuntime2.default.decorate(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(LocalizedRoute))), (_class = function () {
  function LocalizedSegmentRoute(localizedPaths) {
    _classCallCheck(this, LocalizedSegmentRoute);

    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'nestedRoutes', _descriptor2, this);

    _initDefineProp(this, 'defaultRoute', _descriptor3, this);

    var _localizedPathsType = _flowRuntime2.default.ref('Map', _flowRuntime2.default.ref(LocaleType), _flowRuntime2.default.ref(RoutePathType));

    _flowRuntime2.default.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

    this.localizedPaths = localizedPaths;
  }

  _createClass(LocalizedSegmentRoute, [{
    key: 'freeze',
    value: function freeze() {
      Object.freeze(this);
      Object.freeze(this.nestedRoutes);
    }
  }, {
    key: 'getPath',
    value: function getPath(locale) {
      var _localeType = _flowRuntime2.default.ref(LocaleType);

      var _returnType = _flowRuntime2.default.return(_flowRuntime2.default.nullable(_flowRuntime2.default.ref(RoutePathType)));

      _flowRuntime2.default.param('locale', _localeType).assert(locale);

      return _returnType.assert(this.localizedPaths.get(locale));
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
      return Array.from(this.localizedPaths.entries());
    }
  }, {
    key: 'toString',
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return LocalizedSegmentRoute;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'localizedPaths', [_dec], {
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
exports.default = LocalizedSegmentRoute;
//# sourceMappingURL=LocalizedSegmentRoute.js.map
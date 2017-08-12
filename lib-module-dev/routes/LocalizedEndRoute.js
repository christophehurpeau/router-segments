var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

import { LocaleType as _LocaleType, RoutePathType as _RoutePathType, RouteRefType as _RouteRefType } from '../types';

import t from 'flow-runtime';
var LocaleType = t.tdz(function () {
  return _LocaleType;
});
var RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
var RouteRefType = t.tdz(function () {
  return _RouteRefType;
});
var LocalizedEndRoute = (_dec = t.decorate(t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), _dec2 = t.decorate(t.ref(RouteRefType)), (_class = function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    _classCallCheck(this, LocalizedEndRoute);

    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'ref', _descriptor2, this);

    var _localizedPathsType = t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType));

    var _refType = t.ref(RouteRefType);

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);
    t.param('ref', _refType).assert(ref);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  _createClass(LocalizedEndRoute, [{
    key: 'getPath',
    value: function getPath(locale) {
      var _localeType = t.ref(LocaleType);

      var _returnType = t.return(t.nullable(t.ref(RoutePathType)));

      t.param('locale', _localeType).assert(locale);

      return _returnType.assert(this.localizedPaths.get(locale));
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

      return _returnType2.assert(false);
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

  return LocalizedEndRoute;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'localizedPaths', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'ref', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
export { LocalizedEndRoute as default };
//# sourceMappingURL=LocalizedEndRoute.js.map
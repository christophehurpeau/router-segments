var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

import { LocaleType as _LocaleType, RoutePathType as _RoutePathType } from '../types';
import _LocalizedRoute from './LocalizedEndRoute';

import t from 'flow-runtime';
var LocalizedRoute = t.tdz(function () {
  return _LocalizedRoute;
});
var LocaleType = t.tdz(function () {
  return _LocaleType;
});
var RoutePathType = t.tdz(function () {
  return _RoutePathType;
});
var LocalizedSegmentRoute = (_dec = t.decorate(t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType))), _dec2 = t.decorate(function () {
  return t.array(t.union(t.ref(LocalizedRoute), t.ref(LocalizedSegmentRoute)));
}), _dec3 = t.decorate(t.nullable(t.ref(LocalizedRoute))), (_class = function () {
  function LocalizedSegmentRoute(localizedPaths) {
    _classCallCheck(this, LocalizedSegmentRoute);

    _initDefineProp(this, 'localizedPaths', _descriptor, this);

    _initDefineProp(this, 'nestedRoutes', _descriptor2, this);

    _initDefineProp(this, 'defaultRoute', _descriptor3, this);

    var _localizedPathsType = t.ref('Map', t.ref(LocaleType), t.ref(RoutePathType));

    t.param('localizedPaths', _localizedPathsType).assert(localizedPaths);

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
      var _localeType = t.ref(LocaleType);

      var _returnType = t.return(t.nullable(t.ref(RoutePathType)));

      t.param('locale', _localeType).assert(locale);

      return _returnType.assert(this.localizedPaths.get(locale));
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      var _returnType2 = t.return(t.boolean());

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
export { LocalizedSegmentRoute as default };
//# sourceMappingURL=LocalizedSegmentRoute.js.map
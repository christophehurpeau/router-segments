'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalizedEndRoute = function () {
  function LocalizedEndRoute(localizedPaths, ref) {
    _classCallCheck(this, LocalizedEndRoute);

    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  _createClass(LocalizedEndRoute, [{
    key: 'getPath',
    value: function getPath(locale) {
      return this.localizedPaths.get(locale);
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return false;
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
}();

exports.default = LocalizedEndRoute;
//# sourceMappingURL=LocalizedEndRoute.js.map
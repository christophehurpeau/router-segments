'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SegmentRoute = function () {
  // nestedRoutes: Array<Route | SegmentRoute> = []; // disable flow: can cause issues with Object.freeze
  function SegmentRoute(path) {
    _classCallCheck(this, SegmentRoute);

    this.nestedRoutes = [];

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
      return this.path;
    }
  }, {
    key: 'isSegment',
    value: function isSegment() {
      return true;
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
}();

exports.default = SegmentRoute;
//# sourceMappingURL=SegmentRoute.js.map
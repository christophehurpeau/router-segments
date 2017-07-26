'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizedSegmentRoute = exports.SegmentRoute = exports.LocalizedEndRoute = exports.EndRoute = exports.EndRouteType = exports.SegmentRouteType = exports.RouteType = undefined;

var _EndRoute = require('./EndRoute');

var _EndRoute2 = _interopRequireDefault(_EndRoute);

var _LocalizedEndRoute = require('./LocalizedEndRoute');

var _LocalizedEndRoute2 = _interopRequireDefault(_LocalizedEndRoute);

var _SegmentRoute = require('./SegmentRoute');

var _SegmentRoute2 = _interopRequireDefault(_SegmentRoute);

var _LocalizedSegmentRoute = require('./LocalizedSegmentRoute');

var _LocalizedSegmentRoute2 = _interopRequireDefault(_LocalizedSegmentRoute);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteType = exports.RouteType = _flowRuntime2.default.type('RouteType', _flowRuntime2.default.union(_flowRuntime2.default.ref(_EndRoute2.default), _flowRuntime2.default.ref(_LocalizedEndRoute2.default), _flowRuntime2.default.ref(_SegmentRoute2.default), _flowRuntime2.default.ref(_LocalizedSegmentRoute2.default)));

const SegmentRouteType = exports.SegmentRouteType = _flowRuntime2.default.type('SegmentRouteType', _flowRuntime2.default.union(_flowRuntime2.default.ref(_SegmentRoute2.default), _flowRuntime2.default.ref(_LocalizedSegmentRoute2.default)));

const EndRouteType = exports.EndRouteType = _flowRuntime2.default.type('EndRouteType', _flowRuntime2.default.union(_flowRuntime2.default.ref(_EndRoute2.default), _flowRuntime2.default.ref(_LocalizedEndRoute2.default)));

exports.EndRoute = _EndRoute2.default;
exports.LocalizedEndRoute = _LocalizedEndRoute2.default;
exports.SegmentRoute = _SegmentRoute2.default;
exports.LocalizedSegmentRoute = _LocalizedSegmentRoute2.default;
//# sourceMappingURL=index.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let SegmentRoute = class {

  constructor(path) {
    this.nestedRoutes = [];

    this.path = path;
  }

  freeze() {
    Object.freeze(this);
    Object.freeze(this.nestedRoutes);
  }

  getPath() {
    return this.path;
  }

  isSegment() {
    return true;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};
exports.default = SegmentRoute;
//# sourceMappingURL=SegmentRoute.js.map
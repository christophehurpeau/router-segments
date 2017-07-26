'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let EndRoute = class {

  constructor(path, ref) {
    this.path = path;
    this.ref = ref;
    // Object.freeze(this);
  }

  getPath() {
    return this.path;
  }

  isSegment() {
    return false;
  }

  toJSON() {
    return this.path;
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};
exports.default = EndRoute;
//# sourceMappingURL=EndRoute.js.map
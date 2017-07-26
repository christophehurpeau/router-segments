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
export { SegmentRoute as default };
//# sourceMappingURL=SegmentRoute.js.map
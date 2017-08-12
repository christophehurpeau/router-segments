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
export { EndRoute as default };
//# sourceMappingURL=EndRoute.js.map
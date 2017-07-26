let LocalizedEndRoute = class {

  constructor(localizedPaths, ref) {
    this.localizedPaths = localizedPaths;
    this.ref = ref;
    Object.freeze(this);
  }

  getPath(locale) {
    return this.localizedPaths.get(locale);
  }

  isSegment() {
    return false;
  }

  toJSON() {
    return Array.from(this.localizedPaths.entries());
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
};
export { LocalizedEndRoute as default };
//# sourceMappingURL=LocalizedEndRoute.js.map
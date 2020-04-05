export default class IView {

  constructor(parent) {
    this.parent = parent;
  }
  get parent () {
    return this._parent;
  }

  set parent (parent) {
    this._parent = parent;
  }

  clear() {
    this.parent.innerHTML = '';
  }
}

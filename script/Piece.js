/**
 * cSpell: disable
 */

class Piece {
  constructor(name, type, img) {
    this._name = name;
    this._type = type;
    this._img = img;
  }

  constructor(name, type) {
    this._name = name;
    this._type = type;
    this._img = '';
  }

  get name() {
    return this._name
  }

  get type() {
    return this._type;
  }

  get img() {
    return this._img;
  }

  get fullName() {
    return this.type + this.name;
  }

  set img(src) {
    this._img = src;
  }

}
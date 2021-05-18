/**
 * cSpell: disable
 */

export default class Piece {
  constructor(name, type, img) {
    this._name = name;
    this._type = type;
    this._img = img;
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

  draw(square) {
    let img = document.createElement('img');
    img.row = square.parentElement.classList[1];
    img.col = square.classList[1];
    img.src = this._img;
    img.style = 'padding-top: 8px;'
    square.appendChild(img);
    console.log('done');
  }
}
/**
 * cSpell: disable
 */

export default class Piece {
  constructor(name, type, img, row, col) {
    this._name = name;
    this._type = type;
    this._img = img;

    this._row = row;
    this._col = col;
    this._inner = document.createElement('img');
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

  get row() {
    return this._row;
  }

  get col() {
    return this._col;
  }

  get fullName() {
    return this.type + this.name;
  }

  get inner() {
    return this._inner;
  }

  set img(src) {
    this._img = src;
  }

  /**
   * @param {{ row: Number; col: String; }} coordinate
   */
  set coord(coordinate) {
    this._row = coordinate.row;
    this._col = coordinate.col;
  }

  draw(img) {
    img.src = this.img;
  }

  load(mrx) {
    this.inner.row = this.row
    this.inner.col = this.col
    this.inner.type = this.type
    this.inner.name = this.name
    this.draw(this.inner)
    mrx[this.row][this.col].appendChild(this.inner)
  }

  addPulse() {
    this.inner.classList.add('pulse')
  }

  removePulse() {
    this.inner.classList.remove('pulse')
  }

  delete(mrx) {
    mrx[this.row][this.col].removeChild(this.inner)
    this.coord = {
      row: 0,
      col: ''
    }
    this._inner = {}
  }
}
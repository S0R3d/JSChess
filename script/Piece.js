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
   * @param {{ row: any; col: any; }} coordinate
   */
  set coord(coordinate) {
    this._row = coordinate.row;
    this._col = coordinate.col;
  }
  /**
   * non in uso
   *
   * @param {*} imgs
   * @memberof Piece
   */
  loadImg(imgs) {
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].row == this.row && imgs[i].col == this.col) {
        let img = imgs[i]
        this.draw(img)
      }
    }
  }

  draw(img) {
    img.src = this.img;
    img.style = 'padding-top: 8px;'
  }

  load(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == this.row && squares[i].col == this.col) {
        let square = squares[i]
        this.inner.row = this.row;
        this.inner.col = this.col;
        this.draw(this.inner)
        square.appendChild(this.inner)
      }
    }
  }

  addPulse() {
    this.inner.classList.add('pulse')
  }

  removePulse() {
    this.inner.classList.remove('pulse')
  }

  delete(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == this.row && squares[i].col == this.col) {
        let square = squares[i]
        square.removeChild(this.inner)
      }
    }
    this.coord = {row: 0, col: ''}
    this._inner = {}
  }
}
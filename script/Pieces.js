/**
 * cSpell: disable
 */

import Piece from "./Piece.js";

export class Pawn extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  draw(img) {
    img.src = this.img;
  }

  valid(target) {
    if (target.type === this.type) {
      return false;
    } else {
      if (this.type === 'w' && target.row == +this.row + 1 && target.col === this.col) {
        return true
      } else if (this.row === 2 && this.type === 'w' && target.row == +this.row + 2 && target.col === this.col) {
        return true
      } else if (this.type === 'b' && target.row == +this.row - 1 && target.col === this.col) {
        return true
      } else if (this.row === 7 && this.type === 'b' && target.row == +this.row - 2 && target.col === this.col) {
        return true
      } else if (this.type === 'w' && target.type === 'b' && target.row == +this.row + 1 && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        return true
      } else if (this.type === 'w' && target.type === 'b' && target.row == +this.row + 1 && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        return true
      } else if (this.type === 'b' && target.type === 'w' && target.row == +this.row - 1 && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        return true
      } else if (this.type === 'b' && target.type === 'w' && target.row == +this.row - 1 && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        return true
      } else {
        return false
      }
    }
  }

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == +this.row + 1 && squares[i].col === this.col) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'yellow'
        }
      } else if (this.row === 2 && (squares[i].row == +this.row + 2 && squares[i].col === this.col)) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'yellow'
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        let square = squares[i]
        console.log(square);
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'red'
          }
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'red'
          }
        }
      }
    }
  }

  showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == +this.row - 1 && squares[i].col === this.col) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'yellow'
        }
      } else if (this.row === 7 && (squares[i].row == +this.row - 2 && squares[i].col === this.col)) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'yellow'
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'red'
          }
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'red'
          }
        }
      }
    }
  }

  move(squares, target) {
    let coord = {
      row: target.row,
      col: target.col
    }

    if (this.valid(target)) {
      this.coord = coord
      this.load(squares)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(squares, target) {
    let coord = {
      row: target.row,
      col: target.col
    }

    if (this.valid(target)) {
      target.delete(squares)
      this.coord = coord
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }
}

export class Tower extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  valid(target) {

  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      
    }
  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
   showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  move() {

  }

  eat() {

  }
}

export class Knight extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  valid(target) {

  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
   showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  move() {

  }

  eat() {

  }
}

export class Bishop extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  valid(target) {

  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
   showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  move() {

  }

  eat() {

  }
}

export class Queen extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  valid(target) {

  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
   showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  move() {

  }

  eat() {

  }
}

export class King extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  valid(target) {

  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }
  /**
   * 
   * @param {*} squares
   * @memberof Tower
   */
   showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  move() {

  }

  eat() {

  }
}
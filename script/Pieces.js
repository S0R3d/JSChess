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
  /**
   *  Disegna la casa di rosso e mangia un pezzo;
   *  disegna la casa di giallo dove si può muovere,
   *  se si può muovere!
   *
   * @param {*} squares
   * @memberof Pawn
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == +this.row + 1 && squares[i].col === this.col) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'yellow'
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          square.style.backgroundColor = 'red'
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          square.style.backgroundColor = 'red'
        }
      }
    }
  }
  /**
   *
   *
   * @param {*} squares
   * @memberof Pawn
   */
  showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == +this.row - 1 && squares[i].col === this.col) {
        // mossa pedone in avanti
        let square = squares[i]
        if (square.firstChild === null) {
          // non c'è pezzi allora si può muovere
          square.style.backgroundColor = 'yellow'
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        // pedone mangia a destra
        let square = squares[i]
        if (square.firstChild !== null) {
          // c'è un pezzo -> può mangiare
          square.style.backgroundColor = 'red'
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        // pedone mangia a sinstra
        let square = squares[i]
        if (square.firstChild !== null) {
          // c'è un pezzo -> può mangiare
          square.style.backgroundColor = 'red'
        }
      }
    }
  }
  /**
   *
   * @param {*} squares
   * @memberof Pawn
   */
  move(squares) {

  }
  /**
   *
   *
   * @param {*} squares
   * @memberof Pawn
   */
  eat(squares) {

  }
}

export class Tower extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  /**
   *
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {

  }
}

export class Knight extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
}

export class Bishop extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
}

export class Queen extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
}

export class King extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
}
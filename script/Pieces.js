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
   *  Disegna la casa di rosso e mangia un pezzo,
   *  disegna la casa di giallo dove si può muovere
   *  se si può muovere!
   *
   * @memberof Pawn
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      if ([squares[i].row, squares[i].col] === [this.row+1, this.col]) {
        
      }
    }
  }
}

export class Tower extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
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
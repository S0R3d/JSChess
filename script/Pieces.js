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
      // mangia un pezzo dello stesso colore
      // qualunque colore sia
      return false;
    } else {
      if (this.type === 'w' && target.row == +this.row + 1 && target.col === this.col) {
        // controllo bianco per muovere
        return true
      } else if (this.type === 'b' && target.row == +this.row - 1 && target.col === this.col) {
        // controllo nero per muovere
        return true
      } else if (this.type === 'w' && target.type === 'b' && target.row == +this.row + 1 && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        // controllo bianco per mangiare a destra
        return true
      } else if (this.type === 'w' && target.type === 'b' && target.row == +this.row + 1 && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        // controllo bianco per mangiare a sinistra
        return true
      } else if (this.type === 'b' && target.type === 'w' && target.row == +this.row - 1 && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        // controllo nero per mangiare a destra
        return true
      } else if (this.type === 'b' && target.type === 'w' && target.row == +this.row - 1 && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        // controllo nero per mangiare a sinistra
        return true
      } else {
        return false
      }
    }
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
  /**
   *
   *
   * @param {*} squares
   * @memberof Pawn
   */
  showMoveBlack(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == +this.row - 1 && squares[i].col === this.col) {
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
  /**
   *
   * @param {*} squares
   * @memberof Pawn
   */
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
  /**
   *
   *
   * @param {*} squares
   * @memberof Pawn
   */
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
  /**
   * si puo movere per linee verticali e orizzonatali
   * illimitatamente, e viene interrotto solo da un altro pezzo
   * 
   * vert = si muove sui numeri
   * orizz = si muove sulle lettere
   * @param {*} squares
   * @memberof Tower
   */
  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
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
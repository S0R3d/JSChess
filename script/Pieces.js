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
      } else return false
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
    console.log(target.row+target.col);
    console.log(this.row+this.col);
    if (target.type === this.type) {
      return false
    } else {
      if (+target.row > this.row && target.col == this.col) return true
      else if (+target.row < this.row && target.col == this.col) return true
      else if (target.row == this.row && target.col > this.col) return true
      else if (target.row == this.row && target.col < this.col) return true
      else return false
    }
  }

  showMoveWhite(squares) {
    let baseCoord = []

    // based on C file
    // let count = 0
    // for (let i = 0; i < squares.length; i++) {
    //   let square = squares[i]

    //   if (+square.row > this.row && square.col == this.col) {
    //     if (square.firstChild === null) {
    //       square.style.backgroundColor = 'yellow'
    //     } else {
    //       square.style.backgroundColor = 'red'
    //     }
    //   } else if (+square.row < this.row && square.col == this.col) {
    //     if (square.firstChild === null) {
    //       square.style.backgroundColor = 'yellow'
    //     } else {
    //       square.style.backgroundColor = 'red'
    //     }
    //   } else if (square.row == this.row && square.col > this.col) {
    //     if (square.firstChild === null) {
    //       square.style.backgroundColor = 'yellow'
    //     } else {
    //       square.style.backgroundColor = 'red'
    //     }
    //   } else if (square.row == this.row && square.col < this.col) {
    //     if (square.firstChild === null) {
    //       square.style.backgroundColor = 'yellow'
    //     } else {
    //       square.style.backgroundColor = 'red'
    //     }
    //   }
    // }


    for (let i = 0; i < squares.length; i++) {
      if ((squares[i].row == (+this.row + 1) && squares[i].col == this.col) ||
        (squares[i].row == (+this.row - 1) && squares[i].col == this.col) ||
        (squares[i].row == this.row && squares[i].col == String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == this.row && squares[i].col == String.fromCharCode(this.col.charCodeAt() - 1))) {
        baseCoord.push({
          row: squares[i].row,
          col: squares[i].col
        })
      }
    }
    console.log(baseCoord);

    for (let i = 0; i < baseCoord.length; i++) {
      if (baseCoord[i].row > this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (+squares[z].row === +baseCoord[i].row + j && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'yellow'
              } else {
                squares[z].style.backgroundColor = 'red'
                j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (+squares[z].row === +baseCoord[i].row - j && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'yellow'
              } else {
                squares[z].style.backgroundColor = 'red'
                j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].col > this.col && baseCoord[i].row == this.row) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'yellow'
              } else {
                squares[z].style.backgroundColor = 'red'
                j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].col < this.col && baseCoord[i].row == this.row) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'yellow'
              } else {
                squares[z].style.backgroundColor = 'red'
                j = 7
              }
            }
          }
        }
      }
    }
  }

  showMoveBlack(squares) {
    this.showMoveWhite(squares)
  }

  move(squares, target) {
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      this.load(squares)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(squares, target) {

  }
}

export class Knight extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }
  valid(target) {

  }

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  showMoveBlack(squares) {

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

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  showMoveBlack(squares) {

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

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  showMoveBlack(squares) {

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

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {

    }
  }

  showMoveBlack(squares) {

  }

  move() {

  }

  eat() {

  }
}
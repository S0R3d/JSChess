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
    img.style = 'padding-top: 4px'
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
          square.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        }
      } else if (this.row === 2 && (squares[i].row == +this.row + 2 && squares[i].col === this.col)) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        let square = squares[i]
        console.log(square);
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == +this.row + 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
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
          square.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        }
      } else if (this.row === 7 && (squares[i].row == +this.row - 2 && squares[i].col === this.col)) {
        let square = squares[i]
        if (square.firstChild === null) {
          square.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == +this.row - 1 && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        let square = squares[i]
        if (square.firstChild !== null) {
          let imgUrl = square.firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            square.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
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

  draw(img) {
    img.src = this.img
    img.style = 'padding-top: 9px;'
  }

  valid(target) {
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

    for (let i = 0; i < baseCoord.length; i++) {
      if (baseCoord[i].row > this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (+squares[z].row === +baseCoord[i].row + j && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (+squares[z].row === +baseCoord[i].row - j && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].col > this.col && baseCoord[i].row == this.row) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].col < this.col && baseCoord[i].row == this.row) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
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
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      target.delete(squares)
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }
}

export class Knight extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  draw(img) {
    img.src = this.img
    img.style = 'padding-top: 13px;'
  }

  valid(target) {
    if (target.type === this.type) {
      return false
    } else {
      if ((target.row == (+this.row + 2) && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (target.row == (+this.row + 2) && target.col === String.fromCharCode(this.col.charCodeAt() - 1))) return true
      else if ((target.row == (+this.row - 2) && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (target.row == (+this.row - 2) && target.col === String.fromCharCode(this.col.charCodeAt() - 1))) return true
      else if ((target.row == (+this.row + 1) && target.col === String.fromCharCode(this.col.charCodeAt() + 2)) ||
        (target.row == (+this.row - 1) && target.col === String.fromCharCode(this.col.charCodeAt() + 2))) return true
      else if ((target.row == (+this.row + 1) && target.col === String.fromCharCode(this.col.charCodeAt() - 2)) ||
        (target.row == (+this.row - 1) && target.col === String.fromCharCode(this.col.charCodeAt() - 2))) return true
      else return false
    }
  }

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == (+this.row + 2)) {
        if (squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        } else if (squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      } else if (squares[i].row == (+this.row - 2)) {
        if (squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        } else if (squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      } else if (squares[i].col === String.fromCharCode(this.col.charCodeAt() + 2)) {
        if (squares[i].row == (+this.row + 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        } else if (squares[i].row == (+this.row - 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      } else if (squares[i].col === String.fromCharCode(this.col.charCodeAt() - 2)) {
        if (squares[i].row == (+this.row + 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        } else if (squares[i].row == (+this.row - 1)) {
          if (squares[i].firstChild === null) {
            squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
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
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      target.delete(squares)
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }
}

export class Bishop extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  draw(img) {
    img.src = this.img
    img.style = 'padding-top: 11px;'
  }

  valid(target) {
    if (target.type === this.type) {
      return false
    } else {
      if (Math.abs(target.row - this.row) == Math.abs(target.col.charCodeAt() - this.col.charCodeAt())) return true
      else return false
    }
  }

  showMoveWhite(squares) {
    let baseCoord = []
    for (let i = 0; i < squares.length; i++) {
      if ((squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) ||
        (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1))) {
        baseCoord.push({
          row: squares[i].row,
          col: squares[i].col,
        })
      }
    }

    for (let i = 0; i < baseCoord.length; i++) {
      if (baseCoord[i].row > this.row && baseCoord[i].col < this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row + j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row > this.row && baseCoord[i].col > this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row + j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col < this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row - j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col > this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row - j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
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
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      target.delete(squares)
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }
}

export class Queen extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  draw(img) {
    img.src = this.img
    img.style = 'padding-top: 15px;'
  }

  valid(target) {
    if (target.type === this.type) {
      return false
    } else {
      if (Math.abs(target.row - this.row) == Math.abs(target.col.charCodeAt() - this.col.charCodeAt())) return true
      else if (target.row > this.row && target.col === this.col) return true
      else if (target.row == this.row && target.col > this.col) return true
      else if (target.row < this.row && target.col === this.col) return true
      else if (target.row == this.row && target.col < this.col) return true
      else return false
    }
  }

  showMoveWhite(squares) {
    let baseCoord = []

    for (let i = 0; i < squares.length; i++) {
      if ((squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) ||
        (squares[i].row == (+this.row + 1) && squares[i].col === this.col) ||
        (squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == this.row && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (squares[i].row == (+this.row - 1) && squares[i].col === this.col) ||
        (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) ||
        (squares[i].row == this.row && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1))) {
        baseCoord.push({
          row: squares[i].row,
          col: squares[i].col,
        })
      }
    }
    
    for (let i = 0; i < baseCoord.length; i++) {
      if (baseCoord[i].row > this.row && baseCoord[i].col < this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row + j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row >  this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row + j) && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row > this.row && baseCoord[i].col > this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row + j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row == this.row && baseCoord[i].col > this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col > this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row - j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() + j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col === this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row - j) && squares[z].col === baseCoord[i].col) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row < this.row && baseCoord[i].col < this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == (+baseCoord[i].row - j) && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
              }
            }
          }
        }
      } else if (baseCoord[i].row == this.row && baseCoord[i].col < this.col) {
        for (let j = 0; j < 7; j++) {
          for (let z = 0; z < squares.length; z++) {
            if (squares[z].row == baseCoord[i].row && squares[z].col === String.fromCharCode(baseCoord[i].col.charCodeAt() - j)) {
              if (squares[z].firstChild === null) {
                squares[z].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
              } else {
                let imgUrl = squares[z].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
                if (imgUrl[0] !== this.type) {
                  squares[z].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
                  j = 7
                } else j = 7
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
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      target.delete(squares)
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }
}

export class King extends Piece {
  constructor(name, type, img, row, col) {
    super(name, type, img, row, col);
  }

  draw(img) {
    img.src = this.img
    img.style = 'padding-top: 11px;'
  }

  valid(target) {
    if (target.type === this.type || target.name === this.name) {
      return false
    } else {
      if (target.row == (+this.row + 1) && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) return true
      else if (target.row == (+this.row + 1) && target.col === this.col) return true
      else if (target.row == (+this.row + 1) && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) return true
      else if (target.row == this.row && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) return true
      else if (target.row == (+this.row - 1) && target.col === String.fromCharCode(this.col.charCodeAt() + 1)) return true
      else if (target.row == (+this.row - 1) && target.col === this.col) return true
      else if (target.row == (+this.row - 1) && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) return true
      else if (target.row == this.row && target.col === String.fromCharCode(this.col.charCodeAt() - 1)) return true
      else return false
    }
  }

  showMoveWhite(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == (+this.row + 1) && squares[i].col === this.col) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == (+this.row + 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == this.row && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == (+this.row - 1) && squares[i].col === this.col) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == (+this.row - 1) && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          }
        }
      } else if (squares[i].row == this.row && squares[i].col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        if (squares[i].firstChild === null) {
          squares[i].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
        } else {
          let imgUrl = squares[i].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
          if (imgUrl[0] !== this.type) {
            squares[i].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
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
    if (this.valid(target)) {
      this.coord = {
        row: target.row,
        col: target.col,
      }
      target.delete(squares)
      this.load(squares)
      return true
    } else {
      console.error('not valid eat');
      return false
    }
  }

  casteling() {
    console.log('arrocco');
  }
}
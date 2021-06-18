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

  valid(t) {
    if (t.type === this.type) {
      return false;
    } else {
      if (this.type === 'w' && t.row == +this.row + 1 && t.col === this.col) {
        return true
      } else if (this.row === 2 && this.type === 'w' && t.row == +this.row + 2 && t.col === this.col) {
        return true
      } else if (this.type === 'b' && t.row == +this.row - 1 && t.col === this.col) {
        return true
      } else if (this.row === 7 && this.type === 'b' && t.row == +this.row - 2 && t.col === this.col) {
        return true
      } else if (this.type === 'w' && t.type === 'b' && t.row == +this.row + 1 && t.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        return true
      } else if (this.type === 'w' && t.type === 'b' && t.row == +this.row + 1 && t.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        return true
      } else if (this.type === 'b' && t.type === 'w' && t.row == +this.row - 1 && t.col === String.fromCharCode(this.col.charCodeAt() + 1)) {
        return true
      } else if (this.type === 'b' && t.type === 'w' && t.row == +this.row - 1 && t.col === String.fromCharCode(this.col.charCodeAt() - 1)) {
        return true
      } else return false
    }
  }

  showMoveWhite(mrx) {
    if (mrx[+this.row + 1][this.col]) {
      if (mrx[+this.row + 1][this.col].firstChild === null) {
        mrx[+this.row + 1][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      }
    }
    if (this.row === 2 && mrx[+this.row + 2][this.col]) {
      if (mrx[+this.row + 2][this.col].firstChild === null) {
        mrx[+this.row + 2][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      }
    }
    if (mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 1)]) {
      if (mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild !== null) {
        mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
      }
    }
    if (mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 1)]) {
      if (mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild !== null) {
        mrx[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
      }
    }
  }

  showMoveBlack(mrx) {
    if (mrx[+this.row - 1][this.col]) {
      if (mrx[+this.row - 1][this.col].firstChild === null) {
        mrx[+this.row - 1][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      }
    }
    if (this.row === 7 && mrx[+this.row - 2][this.col]) {
      if (mrx[+this.row - 2][this.col].firstChild === null) {
        mrx[+this.row - 2][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      }
    }
    if (mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 1)]) {
      if (mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild !== null) {
        mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
      }
    }
    if (mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 1)]) {
      if (mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild !== null) {
        mrx[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
      }
    }
  }

  move(mrx, t) {
    let coord = {
      row: t.row,
      col: t.col
    }

    if (this.valid(t)) {
      this.coord = coord
      this.load(mrx)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(mrx, t) {
    let coord = {
      row: t.row,
      col: t.col
    }
    if (this.valid(t)) {
      t.delete(mrx)
      this.coord = coord
      this.load(mrx)
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

  valid(m, t) {
    if (t.type === this.type) {
      return false
    } else {
      if (t.row > this.row && t.col == this.col) {
        let i = 1
        while (+this.row + i <= t.row) {
          if (m[+this.row + i][this.col].firstChild === null) {
            i++
          } else if (m[+this.row + i][this.col].firstChild !== null) {
            if (+this.row + i == t.row && this.col == t.col) return true
            else return false
          } else return false
        }
        return true
      } else if (t.row < this.row && t.col == this.col) {
        let i = 1
        while (+this.row - i >= t.row) {
          if (m[+this.row - i][this.col].firstChild === null) {
            i++
          } else if (m[+this.row - i][this.col].firstChild !== null) {
            if (+this.row - i == t.row && this.col == t.col) return true
            else return false
          } else return false
        }
        return true
      } else if (t.row == this.row && t.col > this.col) {
        let i = 1
        while (String.fromCharCode(this.col.charCodeAt() + i) <= t.col) {
          if (m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].firstChild === null) {
            i++
          } else if (m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].firstChild !== null) {
            if (this.row == t.row && String.fromCharCode(this.col.charCodeAt() + i) == t.col) return true
            else return false
          } else return false
        }
        return true
      } else if (t.row == this.row && t.col < this.col) {
        let i = 1
        while (String.fromCharCode(this.col.charCodeAt() - i) >= t.col) {
          if (m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].firstChild === null) {
            i++
          } else if (m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].firstChild !== null) {
            if (this.row == t.row && String.fromCharCode(this.col.charCodeAt() - i) == t.col) return true
            else return false
          } else return false
        }
        return true
      } else return false
    }
  }

  showMoveWhite(m) {
    let i = 1

    while (Object.keys(m).includes(`${+this.row + i}`)) {
      if (m[+this.row + i][this.col].firstChild === null) {
        m[+this.row + i][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      } else {
        let imgUrl = m[+this.row + i][this.col].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
        if (imgUrl[0] !== this.type) {
          m[+this.row + i][this.col].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          break
        } else break
      }
      i++
    }
    i = 1
    while (Object.keys(m).includes(`${+this.row - i}`)) {
      if (m[+this.row - i][this.col].firstChild === null) {
        m[+this.row - i][this.col].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      } else {
        let imgUrl = m[+this.row - i][this.col].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
        if (imgUrl[0] !== this.type) {
          m[+this.row - i][this.col].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          break
        } else break
      }
      i++
    }
    i = 1
    while (Object.keys(m[this.row]).includes((String.fromCharCode(this.col.charCodeAt() + i)))) {
      if (m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].firstChild === null) {
        m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      } else {
        let imgUrl = m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
        if (imgUrl[0] !== this.type) {
          m[this.row][String.fromCharCode(this.col.charCodeAt() + i)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          break
        } else break
      }
      i++
    }
    i = 1
    while (Object.keys(m[this.row]).includes((String.fromCharCode(this.col.charCodeAt() - i)))) {
      if (m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].firstChild === null) {
        m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
      } else {
        let imgUrl = m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
        if (imgUrl[0] !== this.type) {
          m[this.row][String.fromCharCode(this.col.charCodeAt() - i)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
          break
        } else break
      }
      i++
    }
  }

  showMoveBlack(m) {
    this.showMoveWhite(m)
  }

  move(m, t) {
    if (this.valid(m, t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      this.load(m)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(m, t) {
    if (this.valid(m, t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      t.delete(m)
      this.load(m)
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

  valid(t) {
    if (t.type === this.type) {
      return false
    } else {
      if ((t.row == (+this.row + 2) && t.col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (t.row == (+this.row + 2) && t.col === String.fromCharCode(this.col.charCodeAt() - 1))) return true
      else if ((t.row == (+this.row - 2) && t.col === String.fromCharCode(this.col.charCodeAt() + 1)) ||
        (t.row == (+this.row - 2) && t.col === String.fromCharCode(this.col.charCodeAt() - 1))) return true
      else if ((t.row == (+this.row + 1) && t.col === String.fromCharCode(this.col.charCodeAt() + 2)) ||
        (t.row == (+this.row - 1) && t.col === String.fromCharCode(this.col.charCodeAt() + 2))) return true
      else if ((t.row == (+this.row + 1) && t.col === String.fromCharCode(this.col.charCodeAt() - 2)) ||
        (t.row == (+this.row - 1) && t.col === String.fromCharCode(this.col.charCodeAt() - 2))) return true
      else return false
    }
  }

  showMoveWhite(m) {
    if (Object.keys(m).includes(`${+this.row + 2}`)) {
      if (Object.keys(m[+this.row + 2]).includes(String.fromCharCode(this.col.charCodeAt() - 1))) {
        if (m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() - 1)]) {
          if (m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild === null) {
            m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
      if (Object.keys(m[+this.row + 2]).includes(String.fromCharCode(this.col.charCodeAt() + 1))) {
        if (m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() + 1)]) {
          if (m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild === null) {
            m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row + 2][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
    }
    if (Object.keys(m).includes(`${+this.row - 2}`)) {
      if (Object.keys(m[+this.row - 2]).includes(String.fromCharCode(this.col.charCodeAt() + 1))) {
        if (m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() + 1)]) {
          if (m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild === null) {
            m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() + 1)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() + 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
      if (Object.keys(m[+this.row - 2]).includes(String.fromCharCode(this.col.charCodeAt() - 1))) {
        if (m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() - 1)]) {
          if (m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild === null) {
            m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() - 1)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row - 2][String.fromCharCode(this.col.charCodeAt() - 1)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
    }
    if (Object.keys(m[this.row]).includes(String.fromCharCode(this.col.charCodeAt() + 2))) {
      if (Object.keys(m).includes(`${+this.row - 1}`)) {
        if (m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 2)]) {
          if (m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 2)].firstChild === null) {
            m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 2)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 2)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() + 2)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
      if (Object.keys(m).includes(`${+this.row + 1}`)) {
        if (m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 2)]) {
          if (m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 2)].firstChild === null) {
            m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 2)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 2)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() + 2)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
    }
    if (Object.keys(m[this.row]).includes(String.fromCharCode(this.col.charCodeAt() - 2))) {
      if (Object.keys(m).includes(`${+this.row + 1}`)) {
        if (m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 2)]) {
          if (m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 2)].firstChild === null) {
            m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 2)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 2)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row + 1][String.fromCharCode(this.col.charCodeAt() - 2)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
      if (Object.keys(m).includes(`${+this.row - 1}`)) {
        if (m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 2)]) {
          if (m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 2)].firstChild === null) {
            m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 2)].style.backgroundColor = 'rgba(255, 255, 0, 0.5)'
          } else {
            let imgUrl = m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 2)].firstChild.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
            if (imgUrl[0] !== this.type) {
              m[+this.row - 1][String.fromCharCode(this.col.charCodeAt() - 2)].style.backgroundColor = 'rgba(255, 0, 0, 0.6)'
            }
          }
        }
      }
    }
  }

  showMoveBlack(m) {
    this.showMoveWhite(m)
  }

  move(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      this.load(m)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      t.delete(m)
      this.load(m)
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

  // posso scavalcare i pezzi
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

  move(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      this.load(m)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      t.delete(m)
      this.load(m)
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

  // posso scavalcare i pezzi
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
      } else if (baseCoord[i].row > this.row && baseCoord[i].col === this.col) {
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

  move(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      this.load(m)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      t.delete(m)
      this.load(m)
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

  move(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      this.load(m)
      return true
    } else {
      console.error('not valid move');
      return false
    }
  }

  eat(m, t) {
    if (this.valid(t)) {
      this.coord = {
        row: t.row,
        col: t.col,
      }
      t.delete(m)
      this.load(m)
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
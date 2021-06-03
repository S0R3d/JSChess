/**
 * cSpell: disable
 */

import {
    Pawn,
    Tower,
    Knight,
    Bishop,
    Queen,
    King
} from "./Pieces.js"


const DIM = 8
const $board = $('#board')[0]
let CanIMove = false
let turn

const bPieces = [
    '/img/b-tower.svg',
    '/img/b-knight.svg',
    '/img/b-bishop.svg',
    '/img/b-queen.svg',
    '/img/b-king.svg',
    '/img/b-bishop.svg',
    '/img/b-knight.svg',
    '/img/b-tower.svg',
    '/img/b-pawn.svg',
]

const wPieces = [
    '/img/w-tower.svg',
    '/img/w-knight.svg',
    '/img/w-bishop.svg',
    '/img/w-king.svg',
    '/img/w-queen.svg',
    '/img/w-bishop.svg',
    '/img/w-knight.svg',
    '/img/w-tower.svg',
    '/img/w-pawn.svg',
]

const whites = {
    pawn1: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'a'),
    // ???
    pawn2: new Pawn('pawn', 'w', '/img/w-pawn.svg', 3, 'b'),
    pawn3: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'c'),
    pawn4: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'd'),
    pawn5: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'e'),
    pawn6: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'f'),
    pawn7: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'g'),
    pawn8: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'h'),

    tower1: new Tower('tower', 'w', '/img/w-tower.svg', 1, 'a'),
    knight1: new Knight('knight', 'w', '/img/w-knight.svg', 1, 'b'),
    bishop1: new Bishop('bishop', 'w', '/img/w-bishop.svg', 1, 'c'),
    queen: new Queen('queen', 'w', '/img/w-queen.svg', 1, 'd'),
    king: new King('king', 'w', '/img/w-king.svg', 1, 'e'),
    bishop2: new Bishop('bishop', 'w', '/img/w-bishop.svg', 1, 'f'),
    knight2: new Knight('knight', 'w', '/img/w-knight.svg', 1, 'g'),
    tower2: new Tower('tower', 'w', '/img/w-tower.svg', 1, 'h'),
}

const blacks = {
    pawn1: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'a'),
    pawn2: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'b'),
    pawn3: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'c'),
    pawn4: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'd'),
    pawn5: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'e'),
    pawn6: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'f'),
    pawn7: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'g'),
    pawn8: new Pawn('pawn', 'b', '/img/b-pawn.svg', 7, 'h'),

    tower1: new Tower('tower', 'b', '/img/b-tower.svg', 8, 'a'),
    knight1: new Knight('knight', 'b', '/img/b-knight.svg', 8, 'b'),
    bishop1: new Bishop('bishop', 'b', '/img/b-bishop.svg', 8, 'c'),
    queen: new Queen('queen', 'b', '/img/b-queen.svg', 8, 'd'),
    king: new King('king', 'b', '/img/b-king.svg', 8, 'e'),
    bishop2: new Bishop('bishop', 'b', '/img/b-bishop.svg', 8, 'f'),
    knight2: new Knight('knight', 'b', '/img/b-knight.svg', 8, 'g'),
    tower2: new Tower('tower', 'b', '/img/b-tower.svg', 8, 'h'),
}

const nextChar = c => {
    return String.fromCharCode(c.charCodeAt() + 1)
}

const loadBoard = () => {
    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i % 2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < DIM; j++) {
            let square = document.createElement('div')
            square.className = 'col-sm'
            square.style.backgroundColor = j % 2 === 0 ? '#fff' : '#000'
            row.appendChild(square)
        }
        $board.appendChild(row)
    }
}

const addCoordinate = (params) => {
    const rows = document.querySelectorAll('.row')
    for (let i = 0; i < DIM; i++) {
        let row = rows[i]
        if (row.style.flexDirection == 'row-reverse') {
            let square = row.lastElementChild
            for (let j = 0; j < DIM; j++) {
                square.classList.add(String.fromCharCode(97 + j))
                square = square.previousElementSibling;
            }
        } else {
            let squares = row.children
            for (let j = 0; j < DIM; j++) {
                let square = squares[j]
                square.classList.add(String.fromCharCode(97 + j))
            }
        }
    }
    let squares = document.querySelectorAll('.col-sm')
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        square.row = square.parentElement.classList[1]
        square.col = square.classList[1]
    }
}

const loadPieces = () => {
    const squares = document.querySelectorAll('.col-sm')

    Object.values(whites).forEach(element => {
        element.load(squares)
    });

    Object.values(blacks).forEach(element => {
        element.load(squares)
    });
}
/**
 * mi fa cacare ma funziona
 * aggiona tutta la board
*/
const resetBoardColor = () => {
    const squares = document.querySelectorAll('.col-sm')
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        square.style.backgroundColor = i % 2 === 0 ? '#fff' : '#000'
    }
}

const getPiece = obj => {
    const coordinate = {
        row: obj.row,
        col: obj.col,
    }
    console.log(coordinate.row + coordinate.col);

    let piece
    Object.values(whites).forEach(element => {
        element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    })
    Object.values(blacks).forEach(element => {
        element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    })

    return piece
}

const clickOnImg = (piece, target) => {

    if (!CanIMove) {
        // show mosse
        beforMove(piece)
        console.log('mostra');
        CanIMove = true;
    } else {
        // mosse gia mostrate, si puo mangiare
        movePiece(piece, target)
        console.log('si mangia');
        CanIMove = false;
    }
    
}

const clickOnDiv = (piece, target) => {

    if (CanIMove) {
        // si puo muovere
        movePiece(piece, target)
        console.log('si muove');
        CanIMove = false;
    } else {
        console.log('niente');
    }
}
/**
 *  Riceve il pezzo,
 *  aggiungi classe PULSE (in css) per mostrare il pezzo selezionato,
 *  mostra le varie mosse possibili,
 *
 */
const beforMove = (piece) => {
    console.log('show');
    piece.addPulse()

    const squares = document.querySelectorAll('.col-sm')
    if (piece.type === 'b') {
       piece.showMoveBlack(squares)
    } else if (piece.type === 'w') {
        piece.showMoveWhite(squares)
    } else {
        console.error('show err');
    }
}

/**
 *  movere il pezzo usando metode delle classi,
 * 
 *  rimuovere la classe PULSE un volta effettuata la mossa (alla fine)
 */
const movePiece = (piece, target) => {
    console.log('move');
    const squares = document.querySelectorAll('.col-sm')

    // muovi il pezzo
    piece.coord = {row: target.row, col: target.col,}
    piece.load(squares)

    // reset colore case
    resetBoardColor()

    piece.removePulse()
}

const showStatus = (params) => {
    let $status = $('#container.status')
    let log = -1
    this.addEventListener('keyup', (e) => {
        if (e.keyCode == 83 && log == 83) {
            $status.css('display', 'none')
            log = -1
        } else if (e.keyCode == 83) {
            $status.css('display', 'block')
            log = e.keyCode
        }
    })
}

const debug = () => {}

$(() => {
    loadBoard()
    addCoordinate()
    loadPieces()

    /*
        BUG: 'pulse': se premo pezzi diversi qualcosa va storto
    */
    // let canIMove = false

    // merge
    let piece = {}, precPiece = {}
    $('.col-sm').on('click', obj => {
        console.log(obj.target);

        if (obj.target.tagName === 'IMG') {
            console.log('img');

            piece = getPiece(obj.target)
            if (piece === precPiece) {
                console.log('solito');
            } else {
                clickOnImg(piece, obj.target)
            }
            precPiece = piece
        } else if (obj.target.firstChild === null) {
            console.log('div');

            if (precPiece !== null) {
                clickOnDiv(precPiece, obj.target)
            }
        } else if (obj.target.firstChild.tagName === 'IMG') {
            console.log('div - img');

            piece = getPiece(obj.target)
            if (piece === precPiece) {
                console.log('solito');
            } else {
                clickOnImg(piece, obj.target)
            }
            precPiece = piece
        } else {
            console.err('other');
        }
    })

    // $('img').on('click', obj => {
    //     const coordinate = {
    //         row: obj.target.row,
    //         col: obj.target.col,
    //     }
    //     console.log(coordinate.row + coordinate.col);

    //     let piece
    //     Object.values(whites).forEach(element => {
    //         element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    //     })
    //     Object.values(blacks).forEach(element => {
    //         element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    //     })


    //     beforMove(piece)
    //     flagClick = false;
    //     // if (flagClick) {
    //     //     beforMove(piece)
    //     //     flagClick = false
    //     // } else {
    //     //     move(piece)
    //     //     flagClick = true
    //     // }
    //     console.log('end click img');
    // })

    // $('.col-sm').on('click', obj => {
    //     const coordinate = {
    //         row: obj.target.row,
    //         col: obj.target.col,
    //     }
    //     console.log(coordinate.row + coordinate.col);

    //     let piece
    //     Object.values(whites).forEach(element => {
    //         element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    //     })
    //     Object.values(blacks).forEach(element => {
    //         element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;
    //     })


    //     movePiece(piece)
    //     flagClick = true;
    //     // if (flagClick) {
    //     //     console.log('true');
    //     //     console.log(obj.target);    
    //     // } else {
    //     //     console.log('false');
    //     //     console.log(obj.target);
    //     // }
    //     console.log('end click col');
    // })

    // showStatus()
    debug()
})
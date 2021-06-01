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
    pawn1: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'a'),
    pawn2: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'b'),
    pawn3: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'c'),
    pawn4: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'd'),
    pawn5: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'e'),
    pawn6: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'f'),
    pawn7: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'g'),
    pawn8: new Pawn('w', 'pawn', '/img/w-pawn.svg', 2, 'h'),

    tower1: new Tower('w', 'tower', '/img/w-tower.svg', 1, 'a'),
    knight1: new Knight('w', 'knight', '/img/w-knight.svg', 1, 'b'),
    bishop1: new Bishop('w', 'bishop', '/img/w-bishop.svg', 1, 'c'),
    queen: new Queen('w', 'queen', '/img/w-queen.svg', 1, 'd'),
    king: new King('w', 'king', '/img/w-king.svg', 1, 'e'),
    bishop2: new Bishop('w', 'bishop', '/img/w-bishop.svg', 1, 'f'),
    knight2: new Knight('w', 'knight', '/img/w-knight.svg', 1, 'g'),
    tower2: new Tower('w', 'tower', '/img/w-tower.svg', 1, 'h'),
}   

const blacks = {
    pawn1: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'a'),
    pawn2: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'b'),
    pawn3: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'c'),
    pawn4: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'd'),
    pawn5: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'e'),
    pawn6: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'f'),
    pawn7: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'g'),
    pawn8: new Pawn('b', 'pawn', '/img/b-pawn.svg', 7, 'h'),

    tower1: new Tower('b', 'tower', '/img/b-tower.svg', 8, 'a'),
    knight1: new Knight('b', 'knight', '/img/b-knight.svg', 8, 'b'),
    bishop1: new Bishop('b', 'bishop', '/img/b-bishop.svg', 8, 'c'),
    queen: new Queen('b', 'queen', '/img/b-queen.svg', 8, 'd'),
    king: new King('b', 'king', '/img/b-king.svg', 8, 'e'),
    bishop2: new Bishop('b', 'bishop', '/img/b-bishop.svg', 8, 'f'),
    knight2: new Knight('b', 'knight', '/img/b-knight.svg', 8, 'g'),
    tower2: new Tower('b', 'tower', '/img/b-tower.svg', 8, 'h'),
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
 *  Riceve il pezzo,
 *  aggiungi classe PULSE (in css) per mostrare il pezzo selezionato,
 *  mostra le varie mosse possibili,
 *
 */
const beforMove = () => {
    console.log('show');
}

/**
 *  movere il pezzo usando metode delle classi,
 * 
 *  rimuovere la classe PULSE un volta effettuata la mossa (alla fine)
 */
const move = () => {
    console.log('move');
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
    let flagClick = true

    $('img').on('click', obj => {
        // due possibilità:
        // 1 click selezione pezzo da muovere
        // 2 click dove muovere il pezzo

        const coordinate = {
            row: obj.target.row,
            col: obj.target.col,
        }
        console.log(coordinate.row+coordinate.col);

        let piece
        Object.values(whites).forEach(element => {
            element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;  
        })
        Object.values(blacks).forEach(element => {
            element.row === coordinate.row && element.col === coordinate.col ? piece = element : undefined;  
        })
        console.log(piece);
        
        if (flagClick) {
            beforMove()
            flagClick = false
        } else {
            move()
            flagClick = true
        }
    })

    // showStatus()
    debug()
})
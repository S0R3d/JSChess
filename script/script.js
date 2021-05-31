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
    tower: new Tower('w', 'tower', '/img/w-tower.svg'),
    knight: new Knight('w', 'knight', '/img/w-knight.svg'),
    bishop: new Bishop('w', 'bishop', '/img/w-bishop.svg'),
    queen: new Queen('w', 'queen', '/img/w-queen.svg'),
    king: new King('w', 'king', '/img/w-king.svg'),
    pawn: new Pawn('w', 'pawn', '/img/w-pawn.svg'),
}

const blacks = {
    tower: new Tower('b', 'tower', '/img/b-tower.svg'),
    knight: new Knight('b', 'knight', '/img/b-knight.svg'),
    bishop: new Bishop('b', 'bishop', '/img/b-bishop.svg'),
    queen: new Queen('b', 'queen', '/img/b-queen.svg'),
    king: new King('b', 'king', '/img/b-king.svg'),
    pawn: new Pawn('b', 'pawn', '/img/b-pawn.svg'),
}

console.log(whites);
console.log(blacks);

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
}

const laodClassPieces = () => {
    const squares = document.querySelectorAll('.col-sm')

}

const loadPieces = () => {
    const squares = document.querySelectorAll('.col-sm')
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        let img = document.createElement('img')
        img.row = square.parentElement.classList[1]
        img.col = square.classList[1]
        square.appendChild(img)
    }

    const imgs = document.querySelectorAll('img')
    for (let i = 0; i < DIM; i++) {
        let bSrc = bPieces[i]
        let wSrc = wPieces[i]
        let bPawnSrc = bPieces[8]
        let wPawnSrc = wPieces[8]

        let img = imgs[i]
        img.src = bSrc
        img.style = 'padding-top: 8px;'

        let img1 = imgs[i + 56]
        img1.src = wSrc
        img1.style = 'padding-top: 8px;'

        imgs[i + 8].src = bPawnSrc
        imgs[i + 56 - 8].src = wPawnSrc
    }
}

const checkMove = () => {
    
}

const move = () => {
    
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

    move()
    $('img').on('click', obj => {
        // due possibilità:
        // 1 click selezione pezzo da muovere
        // 2 click dove muovere il pezzo
    })


    // showStatus()
    debug()
})
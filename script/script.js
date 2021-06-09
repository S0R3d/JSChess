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

// CanIMove = true: puo muovere, gia mostrate le mosse possibili
// CanIMove = false: mostrare le mosse possibili
let CanIMove = false
// nextTurn = true: sta al giocatore dopo
// nextTurn = false: finchè è a false muove sempre o stesso giocatore
let nextTurn = false
// turn = 'w'/'b' : mostra di chi è il turno; Parte il Bianco
let turn = 'w'

const whites = {
    pawn1: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'a'),    
    pawn2: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'b'),
    pawn3: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'c'),
    pawn4: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'd'),
    pawn5: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'e'),
    pawn6: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'f'),
    pawn7: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'g'),
    pawn8: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'h'),

    tower1: new Tower('tower', 'w', '/img/w-tower.svg', 4, 'e'),
    knight1: new Knight('knight', 'w', '/img/w-knight.svg', 1, 'b'),
    bishop1: new Bishop('bishop', 'w', '/img/w-bishop.svg', 1, 'c'),
    queen: new Queen('queen', 'w', '/img/w-queen.svg', 3, 'c'),
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

    tower1: new Tower('tower', 'b', '/img/b-tower.svg', 6, 'b'),
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

const resetBoardColor = () => {
    const squares = document.querySelectorAll('.col-sm')
    for (let i = 0; i < squares.length; i++) {
        let square = squares[i]
        square.style.backgroundColor = i % 2 === 0 ? '#fff' : '#000'
    }
}

const getPiece = obj => {
    // console.log(obj.row + obj.col);
    let piece
    Object.values(whites).forEach(element => {
        element.row === obj.row && element.col === obj.col ? piece = element : undefined;
    })
    Object.values(blacks).forEach(element => {
        element.row === obj.row && element.col === obj.col ? piece = element : undefined;
    })

    return piece
}

const clickOnImg = (piece, target) => {
    if (!CanIMove) {
        piece = getPiece(target)
        showMove(piece)
    } else {
        if (piece.row === target.row && piece.col === target.col) {
            console.log('same');
        }
        eatPiece(piece, target)
        if (!CanIMove) {
            CanIMove = false
        } else {
            CanIMove = true
        }
    }

}

const clickOnDiv = (piece, target) => {
    if (CanIMove) {
        movePiece(piece, target)
        if (!CanIMove) {
            CanIMove = false
        } else {
            CanIMove = true
        }
    } else {
        console.error('ops!');
    }
}

const showMove = (piece) => {
    console.log('show');
    piece.addPulse()

    const squares = document.querySelectorAll('.col-sm')
    if (piece.type === 'b') {
        piece.showMoveBlack(squares)
    } else if (piece.type === 'w') {
        console.log(piece);
        piece.showMoveWhite(squares)
    } else {
        console.error('show');
    }
}

const movePiece = (piece, target) => {
    console.log('move');
    const squares = document.querySelectorAll('.col-sm')

    piece.move(squares, target) ? {turn: nextTurn = true, move: CanIMove = false} : CanIMove = true;

    if (nextTurn && !CanIMove) {
        resetBoardColor()
        piece.removePulse()
    }
}

const eatPiece = (piece, target) => {
    console.log('eat');
    const squares = document.querySelectorAll('.col-sm')

    piece.eat(squares, getPiece(target)) ? {turn: nextTurn = true, move: CanIMove = false} : CanIMove = true;

    if (nextTurn && !CanIMove) {
        resetBoardColor()
        piece.removePulse()
    }
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

$(() => {
    loadBoard()
    addCoordinate()
    loadPieces()

    /*
        BUG: 'pulse': se premo pezzi diversi qualcosa va storto
    */

    // merge
    let MovePiece = {}
    $('.col-sm').on('click', obj => {
        console.log(obj.target);
        console.log('nextTurn '+nextTurn);
        console.log('CanIMove '+CanIMove);
        console.log(turn);

        if (obj.target.tagName === 'IMG') {
            console.log('img');

            if (!nextTurn && !CanIMove && getPiece(obj.target).type !==  turn) {
                console.error('not ur turn');
                return;
            }
            if (obj.target === MovePiece.inner && CanIMove) {
                console.log('solito');
                CanIMove = false
                MovePiece.removePulse
                resetBoardColor
            } else {
                clickOnImg(MovePiece, obj.target)
            }
            if (!nextTurn && !CanIMove) {
                MovePiece = getPiece(obj.target)
                CanIMove = true;
            }
            if (nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                MovePiece = {}
            }
        } else if (obj.target.firstChild === null) {
            console.log('div');

            if (MovePiece !== null) {
                clickOnDiv(MovePiece, obj.target)
            }
            if (nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                MovePiece = {}
            }
        } else if (obj.target.firstChild.tagName === 'IMG') {
            console.log('div - img');

            if (!nextTurn && !CanIMove && getPiece(obj.target.firstChild).type !==  turn) {
                console.error('not ur turn');
                return;
            }
            if (obj.target.firstChild === MovePiece.inner) {
                console.log('solito');
                CanIMove = false
                MovePiece.removePulse
                resetBoardColor
            } else {
                clickOnImg(MovePiece, obj.target.firstChild)
            }
            if (!nextTurn && !CanIMove) {
                MovePiece = getPiece(obj.target.firstChild)
                CanIMove = true;
            }
            if (nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                MovePiece = {}
            }
        } else {
            console.err(obj.target);
        }
    })

    // showStatus()
})
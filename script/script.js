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
let nextTurn = false
let turn = 'w'

const whites = {
    pawn1: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'a'),
    pawn2: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'b'),
    pawn3: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'c'),
    pawn4: new Pawn('pawn', 'w', '/img/w-pawn.svg', 2, 'd'),
    pawn5: new Pawn('pawn', 'w', '/img/w-pawn.svg', 3, 'e'),
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
    pawn4: new Pawn('pawn', 'b', '/img/b-pawn.svg', 6, 'd'),
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

const getPiece = obj => {
    let piece
    Object.values(whites).forEach(element => {
        element.row == obj.row && element.col === obj.col ? piece = element : undefined;
    })
    Object.values(blacks).forEach(element => {
        element.row == obj.row && element.col === obj.col ? piece = element : undefined;
    })
    return piece
}

const arrayTo2DArray = (array, columns) => Array(Math.ceil(array.length / columns)).fill('').reduce((acc, cur, index) => {
    return [...acc, [...array].splice(index * columns, columns).reverse()]
}, [])

// si può ottimizzare!?
const arrayTo2DObject = (array, dim) => {
    let obj = {}
    for (let i = dim; i >= 1; i--) {
        obj[i] = {}
        for (let j = 1; j <= dim; j++)
            obj[i][String.fromCharCode(j + 96)] = array[j - 1]
        array.splice(0, dim)
    }
    return obj
}

const loadBoard = () => {
    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        for (let j = 0; j < DIM; j++) {
            let square = document.createElement('div')
            square.className = 'col-sm'
            if (i % 2 === 0) square.style.backgroundColor = j % 2 === 0 ? '#fff' : '#000'
            else square.style.backgroundColor = j % 2 === 0 ? '#000' : '#fff'
            row.appendChild(square)
        }
        $board.appendChild(row)
    }
}

const addCoordinate = (params) => {
    const rows = document.querySelectorAll('.row')
    for (let i = 0; i < DIM; i++) {
        let row = rows[i]
        let squares = row.children
        for (let j = 0; j < DIM; j++) {
            let square = squares[j]
            square.classList.add(String.fromCharCode(97 + j))
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
    const mrx = arrayTo2DObject(Array.from($('.col-sm')), 8)

    Object.values(whites).forEach(element => {
        element.load(mrx)
    });
    Object.values(blacks).forEach(element => {
        element.load(mrx)
    });
}

const resetBoardColor = () => {
    const mrx = arrayTo2DObject(Array.from($('.col-sm')), 8)

    for (const key in mrx) {
        if (Object.hasOwnProperty.call(mrx, key)) {
            const obj = mrx[key];
            for (const key2 in obj) {
                if (Object.hasOwnProperty.call(obj, key2)) {
                    const el = obj[key2];
                    if (key % 2 === 0) el.style.backgroundColor = ((key2.charCodeAt() - 97) % 2) === 0 ? '#fff' : '#000'
                    else el.style.backgroundColor = ((key2.charCodeAt() - 97) % 2) === 0 ? '#000' : '#fff'
                }
            }
        }
    }
}

const clickOnImg = (p, t) => {
    if (!CanIMove) {
        p = getPiece(t)
        showMove(p)
    } else {
        if (p.row === t.row && p.col === t.col) console.log('same');
        eatPiece(p, t)
        if (!CanIMove) CanIMove = false
        else CanIMove = true
    }
}

const clickOnDiv = (p, t) => {
    if (CanIMove) {
        movePiece(p, t)
        if (!CanIMove) CanIMove = false
        else CanIMove = true
    } else console.error('ops!');
}

const showMove = (p) => {
    console.log('show');
    p.addPulse()

    const m = arrayTo2DObject(Array.from($('.col-sm')), 8)
    if (p.type === 'b') p.showMoveBlack(m)
    else if (p.type === 'w') p.showMoveWhite(m)
    else console.error('show');
}

const movePiece = (p, t) => {
    console.log('move');

    p.move(arrayTo2DObject(Array.from($('.col-sm')), 8), t) ? {
        turn: nextTurn = true,
        move: CanIMove = false
    } : CanIMove = true;

    if (nextTurn && !CanIMove) {
        resetBoardColor()
        p.removePulse()
    }
}

const eatPiece = (p, t) => {
    console.log('eat');

    p.eat(arrayTo2DObject(Array.from($('.col-sm')), 8), getPiece(t)) ? {
        turn: nextTurn = true,
        move: CanIMove = false
    } : CanIMove = true;

    if (nextTurn && !CanIMove) {
        resetBoardColor()
        p.removePulse()
    }
}
/**
 * Return true, se un qualunque pezzo sulla scacchiera,
 * mette sotto scacco uno dei due re;
 * altrimenti Return false
 * 
 * @returns Boolean
 */
const someoneChecks = () => {
    const m = arrayTo2DObject(Array.from($('.col-sm')), 8)
    const kings = []
    for (const i in m) {
        if (Object.hasOwnProperty.call(m, i)) {
            const rows = m[i];
            for (const j in rows) {
                if (Object.hasOwnProperty.call(rows, j)) {
                    const item = rows[j];
                    if (item.firstChild !== null) if (item.firstChild.name === 'king') kings.push(item)
                }
            }
        }
    }

    // !!!!!! alfieri - undefined quando controllo su re opposto !!!!!!
    let rt = Object.values(m).map(el => Object.values(el).map(item => { 
        if (item.firstChild !== null) {
            if (item.firstChild.name !== 'king') {
                return kings.map(king => {
                    let a = getPiece(item.firstChild).valid(m, getPiece(king.firstChild))
                    return (a != undefined) ? a : false
                })
            } else return [false, false]
        } else return [false]
    }).some(el => {
        let app = el.some(el1 => el1 === true)
        return app
    })).some(el2 => el2 === true)
    return rt
}

/**
 * Controlla se il pezzo passato come paramentro
 * metter in scacco il re del tipo (type) opposto
 * 
 * Passare come parametro un Piece, non un HTMLElement
 * @param {Piece} p
 * @returns Boolean
 */
const thisPieceGetCheck = (p) => {
    const m = arrayTo2DObject(Array.from($('.col-sm')),8)
    let king

    for (const i in m) {
        if (Object.hasOwnProperty.call(m, i)) {
            for (const j in m[i]) {
                if (Object.hasOwnProperty.call(m[i], j)) {
                    const element = m[i][j];
                    if (element.firstChild !== null) {
                        if (element.firstChild.type !== p.type && element.firstChild.name === 'king') {
                            king = element
                        }
                    }
                }
            }
        }
    }
    console.log('king:', king);
    return p.valid(m, getPiece(king.firstChild))
}

/**
 * Controllo se con la mossa che vorrei fare il re resta in scacco
 * 
 * @param {Piece} p
 * @param {object} t
 * @returns Boolean
 */
const checkThenThisMove = (p, t) => {
    const m = arrayTo2DObject(Array.from($('.col-sm')),8)

    if (t.firstChild === null) {
        console.log('on func: null');
        p.move(m,t)

        if (someoneChecks()) return false
        else return true
    } else if (t.firstChild !== null) {
        console.log('on func: not null');
        p.eat(m, getPiece(t))

        if (someoneChecks()) return false
        else return true
    }
}

const checkMate = () => {
    const m = arrayTo2DObject(Array.from($('.col-sm')), 8)
    const kings = []
    for (const i in m) {
        if (Object.hasOwnProperty.call(m, i)) {
            const rows = m[i];
            for (const j in rows) {
                if (Object.hasOwnProperty.call(rows, j)) {
                    const item = rows[j];
                    if (item.firstChild !== null) if (item.firstChild.name === 'king') kings.push(item)
                }
            }
        }
    }
    return kings.length === 2 ? false : true
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

    const matrix = arrayTo2DObject(Array.from($('.col-sm')), 8)
    console.log(matrix);

    let PieceToMove = {}
    $('.col-sm').on('click', obj => {
        console.log('obj', obj);
        console.log('obj currentTarget', obj.currentTarget);
        console.log('obj target', obj.target);
        console.log('PieceToMove: ', PieceToMove)
        console.log('nextTurn: ', nextTurn);
        console.log('CanIMove: ', CanIMove);
        console.log('turn: ', turn);

        // TRIGGER: quando si preme un pezzo dopo che un pezzo ha messo un re in scacco
        if (someoneChecks()) {
            console.warn(`KING ${turn === 'b' ? 'Black' : 'White'} UNDER CHECK!`);
            // deve fare una mossa che permetta al re di non essere piu sotto scacco,
            //  altrimenti è scacco matto

            

            // test mossa porposta
            // show gia fatto MovePiece non piu nullo
            if (CanIMove) {
                // NOME VARIBILI PER CAPIRCI QUALCOSA
                const {
                    row: rowPezzoCorrente,
                    col: colPezzoCorrente,
                    inner: imgPezzeCorrente,
                } = PieceToMove
                let posizioneDoveVorrebbeAndare = obj.currentTarget
                console.log('t: ', posizioneDoveVorrebbeAndare)

                // seleziona il solito per deselezionarlo
                if (posizioneDoveVorrebbeAndare.target === imgPezzeCorrente && CanIMove) {
                    console.log('solito - reset');
                    CanIMove = false
                    MovePiece.removePulse()
                    resetBoardColor()
                }
                // controllo se con la mossa che vorrei fare il re resta in scacco
                else if (checkThenThisMove(PieceToMove, posizioneDoveVorrebbeAndare)) {
                    // controllo se puo muovere ma se c'è un pezzo mangio ed elimino dopo
                    console.log('check avoided');
                    // se la mossa va bene: finisco come al solito
                    nextTurn = true, CanIMove = false
                    resetBoardColor()
                    PieceToMove.removePulse()
                } else {
                    // se la mossa non va bene devo reimpostare tutto come prima del controllo
                    console.error('not valid move to avoid check');
                    const mrxNow = arrayTo2DObject(Array.from($('.col-sm')),8)
                    PieceToMove.coord = {
                        row: rowPezzoCorrente,
                        col: colPezzoCorrente
                    }
                    PieceToMove.load(mrxNow)
                    CanIMove = false
                    resetBoardColor()
                    PieceToMove.removePulse()
                }

                // se passa il test del , posso veramente
                // muovere il pezzo come di base,
                // altrimenti rimuovo pulse, resetto board e canimove a false,
                // ma rimane scacco cosi puo scegliere un altro pezzo.
            }
            // premo una casella senza un pezzo, senza una img
            // else if (obj.currentTarget.firstChild === null) {
            //     console.log('move - div');
    
            //     if (MovePiece !== null) {
            //         clickOnDiv(MovePiece, obj.target)
            //     }
            // } 
            else {
                console.log('show - img');
    
                if (!nextTurn && !CanIMove && obj.currentTarget.firstChild.type !== turn) {
                    console.error('not ur turn');
                    return;
                }
                if (obj.target === PieceToMove.inner && CanIMove) {
                    console.log('solito - reset');
                    CanIMove = false
                    PieceToMove.removePulse()
                    resetBoardColor()
                } else {
                    clickOnImg(PieceToMove, obj.target)
                    if (!nextTurn && !CanIMove) {
                        PieceToMove = getPiece(obj.target)
                        CanIMove = true;
                    }
                }
            }

            // 1: mostro solo le mosse che rimuovono lo scacco
            // 2: abilito il click su pezzi che possono rimuovere lo scacco,
            //  o mangiando il pezzo che fa scacco o posizionando nel mezzo tra pezzo e re

            // 3: come capisco che è scacco matto ?
            // 3.1: non ci sono pezzi che possono mangiare per rimuoevere lo scacco
            // 3.2: non ci sono pezzi che possono posizionarsi tra pezzo e re


            // FINE: si torna al normale flusso
            if (nextTurn && checkMate()) {
                console.error(`CHECHMATE WIN: ${turn === 'b' ? 'BLACK' : 'WHITE'}`);
                $('*').off('click')
            }
            else if (!someoneChecks() && nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                PieceToMove = {}
            }

        } else if (obj.currentTarget.firstChild === null) {
            console.log('move - div');

            if (PieceToMove !== null) {
                clickOnDiv(PieceToMove, obj.target)
            }

            if (someoneChecks()) {
                // console.warn('check');
                console.warn(`KING ${turn === 'b' ? 'White' : 'Black'} UNDER CHECK!`);
            } else {
                console.log('not check');
            }

            if (nextTurn && checkMate()) {
                console.error(`CHECHMATE WIN: ${turn === 'b' ? 'BLACK' : 'WHITE'}`);
                $('*').off('click')
            }
            else if (nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                PieceToMove = {}
            }
        } else {
            console.log('show,eat,castelling - img');

            if (!nextTurn && !CanIMove && obj.currentTarget.firstChild.type !== turn) {
                console.error('not ur turn');
                return;
            }
            if (obj.target === PieceToMove.inner && CanIMove) {
                console.log('solito - reset');
                CanIMove = false
                PieceToMove.removePulse()
                resetBoardColor()
            } else {
                clickOnImg(PieceToMove, obj.target)
                if (!nextTurn && !CanIMove) {
                    PieceToMove = getPiece(obj.target)
                    CanIMove = true;
                }
            }

            if (someoneChecks()) {
                console.warn('check');
            } else {
                console.log('not check');
            }

            if (nextTurn && checkMate()) {
                console.error(`CHECHMATE WIN: ${turn === 'b' ? 'BLACK' : 'WHITE'}`);
                $('*').off('click')
            }
            else if (nextTurn) {
                nextTurn = false, CanIMove = false
                if (turn === 'w') turn = 'b'
                else if (turn === 'b') turn = 'w'
                PieceToMove = {}
            }
        }
    })

    // showStatus()
})
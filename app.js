const board = document.getElementById('board')

const loadBoard = (useLabels) => {
    for (let i = 8; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < 8; j++) {
            let square = document.createElement('div')
            square.className = 'square'
            square.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
            row.appendChild(square)
        }
        board.appendChild(row)
    }

    //--- si puo implementare durante il caricamento soprastante
    let rows = document.getElementsByClassName('row')

    for (let i = 0; i < 8 ; i++) {
        let row = rows[i]
        if (row.style.flexDirection == 'row-reverse') {
            let square = row.lastElementChild
            for (let j = 0; j < 8; j++) {
                square.classList = 'square ' + String.fromCharCode(97 + j)
                square = square.previousElementSibling;
            }
        } else { 
            let squares = row.children
            for (let j = 0; j < 8 ; j++) {
                let square = squares[j]
                square.className = 'square ' + String.fromCharCode(97 + j)
            }
        }
    }
    //---
}

const pieces = {
    bT: 'img/b-tower.svg',
    bN: 'img/b-knight.svg',
    bB: 'img/b-bishop.svg',
    bQ: 'img/b-queen.svg',
    bK: 'img/b-king.svg',
    bP: 'img/b-pawn.svg',

    wT: 'img/w-tower.svg',
    wN: 'img/w-knight.svg',
    wB: 'img/w-bishop.svg',
    wQ: 'img/w-queen.svg',
    wK: 'img/w-king.svg',
    wP: 'img/w-pawn.svg'

}

const loadPieces = (useLabels) => {

    let rows = document.getElementsByClassName('row')

    
}

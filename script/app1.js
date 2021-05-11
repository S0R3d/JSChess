/* GLOBAL var */
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

function loadBoard() {
    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < DIM; j++) {
            let col = document.createElement('div')
            col.className = 'col-sm'
            col.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
            let img = document.createElement('img')
            col.appendChild(img)
            row.appendChild(col)
        }
        $board.appendChild(row)
    }
}

function addCoordinate(params) {
    // // --- si puo implementare durante il caricamento soprastante
    // let rows = document.querySelectorAll('.row')

    // for (let i = 0; i < DIM; i++) {
    //     let row = rows[i]
    //     if (row.style.flexDirection == 'row-reverse') {
    //         let square = row.lastElementChild
    //         for (let j = 0; j < DIM; j++) {
    //             square.classList = 'square ' + String.fromCharCode(97 + j)
    //             square = square.previousElementSibling;
    //         }
    //     } else { 
    //         let squares = row.children
    //         for (let j = 0; j < DIM; j++) {
    //             let square = squares[j]
    //             square.className = 'square ' + String.fromCharCode(97 + j)
    //         }
    //     }
    // }
}

function loadPiece() {
    let imgs = document.querySelectorAll('img')

    for (let i = 0; i < DIM; i++) {
        let bSrc = bPieces[i]
        let wSrc = wPieces[i]

        let img = imgs[i]
        img.src = bSrc
        img.style = 'padding-top: 8px;'

        let img1 = imgs[i+56]
        img1.src = wSrc
        img1.style = 'padding-top: 8px;'
    }

    for (let i = 0; i < DIM; i++) {
        let bSrc = bPieces[8]
        let wSrc = wPieces[8]

        imgs[i+8].src = bSrc
        imgs[i+56-8].src = wSrc
    }

}

function move() {
    console.log('move');
}

function debug() {
    console.log(document.querySelectorAll('.row'))
    console.log(document.querySelectorAll('.col-sm'))
    console.log(document.querySelectorAll('img'))
}
$(() => {
    loadBoard()
    loadPiece()
    move()


    debug()
})
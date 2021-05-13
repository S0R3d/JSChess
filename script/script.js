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

const loadBoard = () => {
    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < DIM; j++) {
            let square = document.createElement('div')
            square.className = 'col-sm'
            square.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
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

const checkMove = (piece, coord, color, type) => {
    if (color === 'b') {
        // black site - dall'alto verso il basso per i pedoni
        // row8 -> row1
        switch (type) {
            case 'pawn':
                console.log('bpawn')
                break;
            case 'tower':
                console.log('btower')
                break;
            case 'knight':
                console.log('bknight')
                break;
            case 'bishop':
                console.log('bbishop')
                break;
            case 'king':
                console.log('bking')
                break;
            case 'queen':
                console.log('bqueen')
                break;
            default:
                break;
        }
        return true
    } else if (color === 'w') {
        // white site - dal basso verso l'alto per i pedoni
        // row1 -> row8
        switch (type) {
            case 'pawn':
                console.log('wpawn')
                break;
            case 'tower':
                console.log('wtower')
                break;
            case 'knight':
                console.log('wknight')
                break;
            case 'bishop':
                console.log('wbishop')
                break;
            case 'king':
                console.log('wking')
                break;
            case 'queen':
                console.log('wqueen')
                break;
            default:
                break;
        }
        return true
    } else return false
}

const move = () => {
    let coordinate = {
        row: 0,
        col: 0,
    }

    $('img').on('click', (obj) => {
        const piece = obj.target
        console.log(piece);
        coordinate.row = piece.row
        coordinate.col = piece.col

        // move(obj.target, coordinate)

        console.log(coordinate.row+','+coordinate.col);

        // ricorda colore, seleiziona casella (square) e metti giallo
        const squarePiece = piece.parentElement
        let precBackgroundColor = squarePiece.style.backgroundColor
        squarePiece.style.backgroundColor = 'yellow'

        // che pezzo è?
        let whichPiece = piece.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
        let [color, type] = [whichPiece[0], whichPiece.slice(1, whichPiece.length)]
        console.log(color)
        console.log(type)

        // mostro mosse possibili
        //controllo coodiante
        const flag = checkMove(piece, coordinate, color, type)
        if (flag) {
            // continue, next click su una posizione in cui il pezzo si puo muovere
            
        } else {
            squarePiece.style.backgroundColor = precBackgroundColor
            return
        }
    })    

    // controllo interazione con altri pezzi
    // è un pedone infondo alla scacchiera?
    // puo mangiare?
    // alla fine del movimento rimettere il colore corretto nella casella (square)
}

const showStatus = (params) => {
    // 83 -> s
    let $status = $('#container.status')
    let log = -1
    this.addEventListener('keyup', (e) => {
        if(e.keyCode == 83 && log == 83) {
            $status.css('display', 'none')
            log = -1
        } else if(e.keyCode == 83)  {
            $status.css('display', 'block')
            log = e.keyCode
        }
    })
}

const debug = () => {
    // console.log(document.querySelectorAll('.row'));
}

// Check README.me
$(() => {
    loadBoard()
    addCoordinate()
    loadPieces()

    move()
    // check coordinate when u click some pieces
    // let coordinatePieceClicked = {
    //     row: 0,
    //     col: 0,
    // }

    // $('img').on('click', (obj) => {
    //     console.log(obj.target);
    //     coordinatePieceClicked.row = obj.target.row
    //     coordinatePieceClicked.col = obj.target.col

    //     move(obj.target, coordinatePieceClicked)
    // })


    // showStatus()
    debug()
})
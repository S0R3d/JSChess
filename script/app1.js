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
    const rows = document.querySelectorAll('.row')

    for (let i = 0; i < DIM; i++) {
        let row = rows[i]
        if (row.style.flexDirection == 'row-reverse') {
            let col = row.lastElementChild
            for (let j = 0; j < DIM; j++) {
                col.classList.add(String.fromCharCode(97 + j))
                col = col.previousElementSibling;
            }
        } else { 
            let cols = row.children
            for (let j = 0; j < DIM; j++) {
                let col = cols[j]
                col.classList.add(String.fromCharCode(97 + j))
            }
        }
    }
}

function loadPiece() {
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

function move() {
    $('img').on('click', (obj) => {
        const $this = obj.target
        console.log($this);

        let colParent = $this.parentElement
        console.log(colParent);

        let rowParent = $this.parentElement.parentElement
        console.log(rowParent);

        // ricordo per rimettere il colore giusto
        let precBGColor = colParent.style.backgroundColor
        colParent.style.backgroundColor = 'yellow'

        
        //controllo coodiante

        let [colBase, ...col] = colParent.classList
        let [rowBase, ...row] = colParent.parentElement.classList

        // mostro mosse possibili

        // controllo pezzi davanti o se in fondo alla scacchiera

        // mangia?


    })
}

function showStatus(params) {
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

function debug() {
    console.log(document.querySelectorAll('.row'));
}

// Check README.me
$(() => {
    loadBoard()
    loadPiece()
    addCoordinate()

    
    move()


    showStatus()

    debug()
})
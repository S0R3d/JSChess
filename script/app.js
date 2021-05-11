const DIM = 8
const board = document.getElementById('board')

const loadBoard = (useLabels) => {
    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < DIM; j++) {
            let square = document.createElement('div')
            square.className = 'square'
            square.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
            row.appendChild(square)
        }
        board.appendChild(row)
    }

    //--- si puo implementare durante il caricamento soprastante
    let rows = document.getElementsByClassName('row')

    for (let i = 0; i < DIM; i++) {
        let row = rows[i]
        if (row.style.flexDirection == 'row-reverse') {
            let square = row.lastElementChild
            for (let j = 0; j < DIM; j++) {
                square.classList = 'square ' + String.fromCharCode(97 + j)
                square = square.previousElementSibling;
            }
        } else { 
            let squares = row.children
            for (let j = 0; j < DIM; j++) {
                let square = squares[j]
                square.className = 'square ' + String.fromCharCode(97 + j)
            }
        }
    }
}

const reset_pieces = ['img/b-tower.svg','img/b-knight.svg','img/b-bishop.svg','img/b-queen.svg','img/b-king.svg','img/b-bishop.svg','img/b-knight.svg','img/b-tower.svg','img/b-pawn.svg','img/w-tower.svg','img/w-knight.svg','img/w-bishop.svg','img/w-king.svg','img/w-queen.svg','img/w-bishop.svg','img/w-knight.svg','img/w-tower.svg','img/w-pawn.svg']

const resetPieces = (useLabels) => {

    let rows = document.getElementsByClassName('row')

    //load black
    for (let i = 0; i < 2; i++) {
        let row = rows[i]

        let squares = row.children;
        for (let j = 0; j < DIM; j++) {
            square = squares[j]
            let img_div = document.createElement('div')
            img_div.className = 'img'
            let obj = document.createElement('object')
            obj.id = 'svg-obj'
            obj.data = i === 1 ? reset_pieces[8] : reset_pieces[j]
            obj.type = 'image/svg+xml'
            obj.height = '99px'
            obj.width = '99px'
            img_div.appendChild(obj)
            square.appendChild(img_div)
        }
    }
    //load white
    for (let i = DIM-2; i < DIM; i++) {
        let row = rows[i]

        let squares = row.children;
        for (let j = 0; j < DIM; j++) {
            let square = squares[j]
            let img_div = document.createElement('div')
            img_div.className = 'img'
            let obj = document.createElement('object')
            obj.id = 'svg-obj'
            obj.data = i === DIM-1 ? reset_pieces[j+9] : reset_pieces[8+9]
            obj.type = 'image/svg+xml'
            obj.height = '99px'
            obj.width = '99px'
            img_div.appendChild(obj)
            square.appendChild(img_div)
        }
    }
}

$(window).on('load', () => {
    loadBoard()
    resetPieces()
})

const resetCoord = () => {
    cont = 0
    row = 0
    col = 'z'
}

const selected = (row, col) => {
    $toMove = $(`.row.${row} > .square.${col}`)
    $toMove.attr('style', 'background-color: yellow')
}
const deselected = (row, col) => {
    $toMove = $(`.row.${row} > .square.${col}`)
    /* $toMove.attr('style', 'background-color: yellow')
    square.style.backgroundColor = row%2 === 0 ? '#fff' : '#000' */
    if (row%2 === 0) {
        toMove.attr('style', 'background-color: #fff')
    } else {
        toMove.attr('style', 'background-color: #000')
    }
}

//
const move = (row, col) => {
    console.log('move');
    $toMove = $(`.row.${row} > .square.${col}`)

    //which piece
    const url = 'http://127.0.0.1:5500/img/'
    let img_src = $toMove[0].children[0].children[0].data
    console.log(img_src.slice(url.length,$toMove.length-5))
}

$(() => {
    //pieces
    let $pieces = $('#container.pieces')
    $('object').mouseenter((e) => {

        //add data
        let parentSquare = e.target.parentElement.parentElement
        let parentRow = parentSquare.parentElement

        let square = parentSquare.classList[1]
        let row = parentRow.classList[1]

        let data_url = e.target.data
        let data = data_url.substring(26, data_url.length-4)

        let color = data.substring(0,1)
        color = color == 'b' ? 'black' : 'white'

        let type = data.substring(2,data.length)

        $('#container.pieces h1').html(color+' '+type)
        $('#container.pieces h2').html('x: '+square+', y: '+row)
        
        //display
        $pieces.css('display', 'block')

        

    })
    $('object').mouseleave((e) => {
        $pieces.css('display', 'none')
    })

    //status
    //83 -> s
    let $status = $('#container.status')
    let prec = -1
    this.addEventListener('keyup', (e) => {
        if(e.keyCode == 83 && prec == 83) {
            $status.css('display', 'none')
            prec = -1
        } else if(e.keyCode == 83)  {
            $status.css('display', 'block')
            prec = e.keyCode
        }
    })

    $('path').on('click', (e) => {
        console.log('click');
    })
    $('path').bind('click', (e) => {
        console.log('click');
    })

    let cont = 0;
    let row = 0 //riga
    let col = 'z' //colonna
    console.log('row '+row)
    console.log('col '+col)

    //to move, click first letter then number
    this.addEventListener('keypress', (e) => {
        console.log(e.key);
        console.log(cont);
        const col_range = ['a','b','c','d','e','f','g','h']
        const row_range = ['1','2','3','4','5','6','7','8']
        const app = e.key

        if(col == 'z' && col_range.includes(app)) {
            col = app
            cont++
            console.log('row '+row)
            console.log('col '+col)
        }
        else if(row == 0 && row_range.includes(app)) {
            row = app
            cont++
            console.log('row '+row)
            console.log('col '+col)
        }
        else if(app == 's') {} else console.log('f*');

        if(cont == 2) {
            //square yellow
            selected(row, col)
            if( confirm('Selected: '+col+row)) {
                try {
                    $(`.row.${row} > .square.${col}`)[0].children[0].children[0].data
                    move(row, col)
                } catch (error) {}
                deselected(row, col)
                resetCoord
            } else {
                deselected(row, col)
                resetCoord 
            }
        }
    })
})
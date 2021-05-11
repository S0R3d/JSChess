

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
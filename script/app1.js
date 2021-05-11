const DIM = 8
const $board = $('.container')[0]

const loadBoard = (board) => {

    for (let i = DIM; i > 0; i--) {
        let row = document.createElement('div')
        row.className = 'row ' + i
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < DIM; j++) {
            let col = document.createElement('div')
            col.className = 'col-sm'
            col.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
            let content = document.createElement('span')
            content.innerHTML = 'X'
            col.appendChild(content)
            row.appendChild(col)
        }
        $board.appendChild(row)
    }


    //--- si puo implementare durante il caricamento soprastante
    // let rows = document.getElementsByClassName('row')

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

$(() => {
    loadBoard($board)
    console.log($board)
})
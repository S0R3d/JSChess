const board = document.getElementById('board')

const loadBoard = (useLabels) => {
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        row.style.flexDirection = i%2 === 0 ? '' : 'row-reverse'
        for (let j = 0; j < 8; j++) {
            let square = document.createElement('div')
            square.className = 'square'
            square.style.backgroundColor = j%2 === 0 ? '#fff' : '#000'
            row.appendChild(square)
        }
        board.appendChild(row)
    }
}
loadBoard()



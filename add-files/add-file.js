// disable click globally
let freezeClick = false;
document.addEventListener("click", e => {
  if (freezeClick) {
    e.stopPropagation();
    e.preventDefault();
  }
}, true);


$('*').addClass('.freezeClick')
await function_name()
$('*').removeClass('.freezeClick')


const piece = obj.target
coordinate.row = piece.row
coordinate.col = piece.col

console.log(coordinate.row + ',' + coordinate.col);

// ricorda colore, seleiziona casella (square) e metti giallo
const squarePiece = piece.parentElement
let precBackgroundColor = squarePiece.style.backgroundColor
squarePiece.style.backgroundColor = 'yellow'


// che pezzo è?
let whichPiece = piece.attributes.src.value.replace(/^\/?/, "").replace(/img\/|.svg/gi, "").replace('-', '')
let [color, type] = [whichPiece[0], whichPiece.slice(1, whichPiece.length)]


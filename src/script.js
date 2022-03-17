import color_array_json from './color_array.js'
import initial_json from './initial_call.js'

let current_color = initial_json.color_array[0]


function initBoard(columnCount, rowCount) {
    const board = document.getElementById("game-board");

    // board.style.gridTemplateColumns = '10% '.repeat(columnCount)
    board.style.gridTemplateRows = '6.6666666% '.repeat(rowCount)

    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            const box = document.createElement("div")
            box.className = "cell cell-box"
            box.style.gridRow = i + 1
            box.style.gridColumn = j + 1
            box.onmousedown = () => updateCellColor(box, i, j)
            box.onmouseover = () => { if (box.style.borderColor === "") { box.style.background = current_color } }
            box.onmouseleave = () => { if (box.style.borderColor === "") { box.style.background = null } }
            board.appendChild(box)
        }
    }
}

function initColorSelection(colors) {
    const color_pallette = document.getElementById('color-pallette')
    const row = document.createElement("div")
    row.className = "color-row"
    for (let i = 0; i < colors.length; i++) {
        const box = document.createElement("div")
        box.className = "cell color-box"
        box.style.background = colors[i]
        box.onclick = () => updateSelectedColor(box)
        row.appendChild(box)
    }
    color_pallette.appendChild(row)
}


initBoard(initial_json.height, initial_json.width)
initColorSelection(initial_json.color_array)

function updateCellColor(self, x, y) {
    const correct_color = color_array_json.color_array[x][y]
    console.log(correct_color)
    if (correct_color == current_color) {
        self.style.background = current_color
        self.style.borderColor = current_color
        self.style.borderRadius = 0
    }
}

function updateSelectedColor(self) {
    current_color = self.style.background;
}
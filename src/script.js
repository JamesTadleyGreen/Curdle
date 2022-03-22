import color_array_json from './color_array.js'
import initial_json from './initial_call.js'

let current_color = rgb(initial_json.color_array[0])

function rgb(array) {
    return 'rgb(' + array.join(', ') + ')';
}


function initBoard(columnCount, rowCount) {
    const board = document.getElementById("game-board");

    // board.style.gridTemplateColumns = '10% '.repeat(columnCount)
    // board.style.gridTemplateRows = '10% '.repeat(rowCount)

    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            const box = document.createElement("div")
            box.className = "cell cell-box"
            box.style.gridRow = i + 1
            box.style.gridColumn = j + 1
            box.onmousedown = () => sendGuess(i, j)
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
        box.style.background = rgb(colors[i])
        box.onclick = () => updateSelectedColor(box)
        row.appendChild(box)
    }
    color_pallette.appendChild(row)
}


initBoard(initial_json.height, initial_json.width)
initColorSelection(initial_json.color_array)

function sendGuess(x, y) {
    fetch("http://127.0.0.1:5000/guess", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 'color': current_color, 'cell_location': [x, y] })
    }).then(res => {
        if (res.ok) {
            return res.json()
        } else {
            return null
        }
    }).then(jsonResponse => updateCellColors(jsonResponse.color_array, jsonResponse.color))
}

function updateCellColors(update_list, color) {
    for (var i = 0; i < update_list.length; i++) {
        updateCellColor(update_list[i][0], update_list[i][1], color)
    }
}

function updateCellColor(x, y, color) {
    const board = document.getElementById("game-board");
    const cell = board.childNodes[x * initial_json.width + y]
    cell.style.background = rgb(color)
    cell.style.borderColor = rgb(color)
}

function updateSelectedColor(self) {
    current_color = self.style.background;
}
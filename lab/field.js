
const W = 16
const B = 1

const PERIOD = 1

let w, h
const grid = []

function init() {
    w = floor(rx(1)/W)
    h = floor(ry(1)/W)
    for (let x = 0; x < w; x++) {
        grid[x] = []
        for (let y = 0; y < h; y++) {
            grid[x][y] = {
                state: 0,
                next: false,
            }
        }
    }

    grid[15][15].state = 1
    grid[15][16].state = 1
    grid[15][17].state = 1
}

function getState(x, y) {
    if (x < 0) x = w - 1
    else if (x >= w) x = 0
    if (y < 0) y = h - 1
    else if (y >= h) y = 0

    return grid[x][y].state
}

function neighbours(x, y) {
    let n = 0
    for (let ny = y - 1; ny <= y + 1; ny++) {
        for (let nx = x - 1; nx <= x + 1; nx++) {
            if (x === nx && y === ny) continue
            if (getState(nx, ny)) n++
        }
    }
    return n
}

let generation = 0
function nextGeneration() {
    generation ++
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const s = getState(x, y)
            const n = neighbours(x, y)

            if (s && (n < 2 || n > 3)) {
                grid[x][y].next = true
            } else if (!s && n === 3) {
                grid[x][y].next = true
            } else {
                grid[x][y].next = false
            }
        }
    }
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (getState(x, y) && grid[x][y].next) {
                grid[x][y].state = 0
            } else if (!getState(x, y) && grid[x][y].next) {
                grid[x][y].state = generation
            }
        }
    }
}

let timer = 0
function evo(dt) {
    timer += dt
    if (timer >= PERIOD) {
        timer = 0
        nextGeneration()
    }
}

function draw() {
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (grid[x][y].state) {
                fill(.55, .5, .5)
                rect(x*W+B, y*W+B, W-2*B, W-2*B)
            }
        }
    }
}

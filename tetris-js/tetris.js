const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
//grow x and y by 20
context.scale(15, 15)

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height)

const matrix = [
    [0, 0 ,0],
    [1, 1, 1],
    [0, 1, 0],
]

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    //need to redraw the canvas so that old sprite paths are removed
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawMatrix(player.matrix, player.pos)
}

// will draw tiles using the matrix + x and y positions
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1)
            }
        })
    })
}
//when a piece is dropped either by 1000ms, or by player pressing down key
function playerDrop() {
    player.pos.y++;
    //if we press down, we don't want it to double drop sometimes so reset to 0 to give a 1 sec buffer
    dropCounter = 0;
}
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    //approx every 1000 milliseconds, drop counter hits 1000, which triggers if statement for y+=1 drop
    dropCounter += deltaTime;
    
    if(dropCounter > dropInterval) {
        playerDrop();
    }
    draw();
    //more research into requestAnimationFrame needed - better alternative to setInterval for game dev
    //requestAnimationFrame calls update from within update for infinite loop
    requestAnimationFrame(update);
}
const arena = createMatrix(12,20)
console.log(arena), console.table(arena)
//easiest to keep track of player this way
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix
}
//keyboard controls
document.addEventListener('keydown', event => {
    if(event.code === "ArrowLeft"){
        player.pos.x--
    }
    if(event.code === "ArrowRight"){
        player.pos.x++
    }
    if(event.code === "ArrowDown"){
        playerDrop();
    }
})
update()
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
];


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

    drawMatrix(arena, {x: 0, y: 0})
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
//copy all the value of player into arena at the correct position
function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                //if value is 1(aka tile) then the arena matrix position with be turned to 1
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}
function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for(let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !==  0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}
//when a piece is dropped either by 1000ms, or by player pressing down key
function playerDrop() {
    player.pos.y++;
    // collision detects either hits ground, or touches another piece
    if (collide(arena, player)){
        //if it collided, then were already on top of another piece or ground, need to put player back up 1
        player.pos.y--;
        //calling merge function which merges the current player pos into the arena matrix grid(viewed with console.table(arena))
        merge(arena,player)
        //reset player back to top
        player.pos.y = 0;
    }
    //if we press down, we don't want it to double drop sometimes so reset to 0 to give a 1 sec buffer
    dropCounter = 0;
}
//for x position movement, if collide with side(goes out 1 block or goes on another block from the side), then return 1 movement of other dir
function playerMove(dir){
    player.pos.x += dir;
    if(collide(arena, player)) {
        player.pos.x -= dir
    }
}
// flipped basically
function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
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
//create the arena to log gamespace - check console.table to view
const arena = createMatrix(16,26)
// console.log(arena), console.table(arena)
//easiest to keep track of player this way
const player = {
    pos: {x: 5, y: 5},
    matrix: matrix
}
//keyboard controls
document.addEventListener('keydown', event => {
    if(event.code === "ArrowLeft"){
        playerMove(-1)
    }
    if(event.code === "ArrowRight"){
        playerMove(+1)
    }
    if(event.code === "ArrowDown"){
        playerDrop();
    }
})

update();
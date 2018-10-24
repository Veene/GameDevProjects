import SpriteSheet from './SpriteSheet.js';
import {loadImage, loadLevel} from './loaders.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
            for (let y = y1; y < y2; ++y) {
                sprites.drawTile(background.tile, context, x, y);
            }
        }
    })
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    //pulls the json from the .json file by using the loadLevel function in loaders.js
    //calls the json file object level, then iterates through level.backgrounds and uses background[0], then background[1] etc.
    loadLevel('1-1')
        .then(level => {
            level.backgrounds.forEach(background => {
                drawBackground(background, context, sprites)
            })
            
        })

        //LEGACY
    // for (let x = 0; x < 25; ++x) {
    //     for (let y = 0; y < 14; ++y) {
    //         sprites.drawTile('sky', context, x, y);
    //     }
    // }
    // for (let x = 0; x < 25; ++x) {
    //     for (let y = 12; y < 14; ++y) {
    //         sprites.drawTile('ground', context, x, y);
    //     }
    // }
    // sprites.draw('ground', context, 5, 20)
    
    // context.drawImage(image, 
    //     16, 0, 16, 16, // how much are we grabbing? 0,0 TO 16x 16y creates a 16x16 pixel from top left
    //     32, 32, 16, 16); // x1,x2 = top left corner position of that piece that we ripped off tiles, so here moved 32x and 32y, x3,x4 = scaling, since we ripped 16x16, it should be 16x16 but u can scale higher
});
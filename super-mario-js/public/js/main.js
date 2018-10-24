import SpriteSheet from './SpriteSheet.js';
import {loadImage} from './loaders.js';

function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}


const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50, 'black')

loadImage('/img/tiles.png')
.then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 5, 20)
    // context.drawImage(image, 
    //     16, 0, 16, 16, // how much are we grabbing? 0,0 TO 16x 16y creates a 16x16 pixel from top left
    //     32, 32, 16, 16); // x1,x2 = top left corner position of that piece that we ripped off tiles, so here moved 32x and 32y, x3,x4 = scaling, since we ripped 16x16, it should be 16x16 but u can scale higher
});
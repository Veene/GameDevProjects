import SpriteSheet from './SpriteSheet.js';
import {loadLevel} from './loaders.js';
import {loadMarioSprite, loadBackgroundSprites} from './sprites.js';

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
    //pulls the json from the .json file by using the loadLevel function in loaders.js
    //calls the json file object level, then iterates through level.backgrounds and uses background[0], then background[1] etc.
    //REFACTORED to promise.all to be able to call in parallel to speed up loading!!!! AWESOME!
class Compositor {
    constructor() {
        this.layers = [];
    }
    draw(context) {
        this.layers.forEach(layer => {
            layer(context)
        })
    }
}
function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites)
    })
    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0)
    };
}

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y)
    }
}
    
Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
.then(([marioSprite, sprites, level]) => {
    const comp = new Compositor();
    
    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
    comp.layers.push(backgroundLayer);
    
    const pos = {
        x: 64,
        y: 64,
    };
    const spriteLayer = createSpriteLayer(marioSprite, pos);
    comp.layers.push(spriteLayer);
    function update(){
        comp.draw(context);
        pos.x += 2;
        pos.y +=2;
        requestAnimationFrame(update);
    }
    update();
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

//we created this class prototype, to avoid using the crazy 8 input context.drawImage(x1,x2,x3,x4,x5,x6,x7,x8)
//invoke with simple new SpriteSheet(image, width, height)
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); //using map to hold key,value pairs, in this case: name of tile and buffer.
    }
    define(name, x, y, width, height) { //name the tile and where starting point is (topleft corner)
        const buffer = document.createElement('canvas');
        buffer.width = width
        buffer.height = height
        buffer
            .getContext('2d')
            .drawImage(
                this.image, 
                x, //what column you want the item (x=0,1,2,3,4)
                y, //what row you want the item (y=0, 1, 2, 3, 4)
                width, 
                height, 
                0, 
                0, 
                width, 
                height);
        this.tiles.set(name, buffer); //set key value pair
    }
    defineTile(name, x, y) {
        this.define(name, x * this.width, y*this.height, this.width, this.height)
    }
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name); //using the map that is storing k:v's and getting buffer.
        context.drawImage(buffer, x, y);
    }
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
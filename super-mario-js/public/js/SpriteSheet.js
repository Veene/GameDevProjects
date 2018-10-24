//we created this class prototype, to avoid using the crazy 8 input context.drawImage(x1,x2,x3,x4,x5,x6,x7,x8)
//invoke with simple new SpriteSheet(image, width, height)
export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); //using map to hold key,value pairs, in this case: name of tile and buffer.
    }
    define(name, x, y) { //name the tile and where starting point is (topleft corner)
        const buffer = document.createElement('canvas');
        buffer.width = this.width; //automatically tells you height and width which was invoke with new Spritesheet
        buffer.height = this.height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image, 
                x * this.width, //what column you want the item (x=0,1,2,3,4)
                y * this.height, //what row you want the item (y=0, 1, 2, 3, 4)
                this.width, 
                this.height, 
                0, 
                0, 
                this.width, 
                this.height);
        this.tiles.set(name, buffer); //set key value pair
    }
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name); //using the map that is storing k:v's and getting buffer.
        context.drawImage(buffer, x, y);
    }
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
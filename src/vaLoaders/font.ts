import { loadImage } from "../loaders";
import SpriteSheet from "../SpriteSheet";

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';


export class Font {
    sprites: SpriteSheet;
    size: number;
    constructor(sprites:SpriteSheet, size:number) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text:string, context:CanvasRenderingContext2D, x:number, y:number) {
        [...text].forEach((char, pos) => {
            this.sprites.draw(char as FontName, context, x + pos * this.size, y);
        });
    }
}


export function loadFont() {
    return loadImage('./img/font.png')
    .then(image => {
        const fontSprite = new SpriteSheet(image, 8, 8);

        const size = 8;
        const rowLen = image.width;
        for (let [index, char] of [...CHARS].entries()) {
            const x = index * size % rowLen;
            const y = Math.floor(index * size / rowLen) * size;
            fontSprite.define(char as FontName, x, y, size, size);
        }

        return new Font(fontSprite, size);
    });
}
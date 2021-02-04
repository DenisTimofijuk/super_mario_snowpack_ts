export default class SpriteSheet {
  tiles: Map<SpriteSheetName, HTMLCanvasElement>;
  constructor(public image: HTMLImageElement, public width: number, public height: number) {
    this.tiles = new Map();
  }

  define(name: SpriteSheetName, x:number, y:number, width: number, height: number) {
    const buffer = document.createElement('canvas');
    buffer.width = width;
    buffer.height = height;
    buffer
      .getContext('2d')!
      .drawImage(
        this.image,
        x,
        y,
        width,
        height,
        0,
        0,
        width,
        height,
      );
    this.tiles.set(name, buffer);
  }

  defineTile(name: SpriteSheetName, x:number, y:number){
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }  

  draw(
    name: SpriteSheetName,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    if (this.tiles.has(name)) {
      const buffer = this.tiles.get(name)!;
      context.drawImage(buffer, x, y);
    } else {
      console.error(`!! ${name} !! was not found on tiles buffer.`);
    }
  }

  drawTile(
    name: SpriteSheetName,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}

export type SpriteSheetName = 'ground' | 'sky';

export default class SpriteSheet {
  image: HTMLImageElement;
  width: number;
  height: number;
  tiles: Map<SpriteSheetName, HTMLCanvasElement>;
  constructor(image: HTMLImageElement, width: number, height: number) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name: SpriteSheetName, x: number, y: number) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer
      .getContext('2d')!
      .drawImage(
        this.image,
        x * this.width,
        y * this.height,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
    this.tiles.set(name, buffer);
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

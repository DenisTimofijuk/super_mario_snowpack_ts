export default class SpriteSheet {
  tiles: Map<SpriteSheetName, HTMLCanvasElement[]>;
  animation: Map<SpriteSheetName, (distance: number) => SpriteSheetName>;
  constructor(
    public image: HTMLImageElement,
    public width: number,
    public height: number,
  ) {
    this.tiles = new Map();
    this.animation = new Map();
  }

  defineAnim(name:SpriteSheetName, animation:(distance: number) => SpriteSheetName){
    this.animation.set(name, animation);
  }

  define(
    name: SpriteSheetName,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext('2d')!;
      if(flip){
        context.scale(-1, 1);
        context.translate(-width, 0);
      }
      context.drawImage(this.image, x, y, width, height, 0, 0, width, height);
      
      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTile(name: SpriteSheetName, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(
    name: SpriteSheetName,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    flip = false
  ) {
    if (this.tiles.has(name)) {
      const buffer = this.tiles.get(name)![flip? 1 : 0];
      context.drawImage(buffer, x, y);
    } else {
      console.error(`!! ${name} !! was not found on tiles buffer.`);
    }
  }

  drawAnim(name:SpriteSheetName, context:CanvasRenderingContext2D, x:number, y:number, distance:number){
    if(this.animation.has(name)){
      const animation = this.animation.get(name)!
      this.drawTile(animation(distance), context, x, y);
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

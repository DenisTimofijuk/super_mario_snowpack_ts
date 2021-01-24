export default class Compositor {
    layers: Array<(context: CanvasRenderingContext2D) => void>;
    constructor() {
      this.layers = [];
    }
  
    draw(context:CanvasRenderingContext2D) {
      this.layers.forEach((layer) => {
        layer(context);
      });
    }
  }
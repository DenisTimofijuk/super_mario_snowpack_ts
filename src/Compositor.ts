import type Camera from "./Camera";

export default class Compositor {
    layers: Array<(a: CanvasRenderingContext2D, b:Camera) => void>;
    constructor() {
      this.layers = [];
    }
  
    draw(context:CanvasRenderingContext2D, camera:Camera) {
      this.layers.forEach((layer) => {
        layer(context, camera);
      });
    }
  }
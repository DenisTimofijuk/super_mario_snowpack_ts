export class Vec2 {
    x!: number;
    y!: number;
    constructor(x:number, y:number) {
      this.set(x, y);
    }
  
    set(x:number, y:number){
      this.x = x;
      this.y = y;
    }
  }
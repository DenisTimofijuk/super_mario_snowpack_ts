
export class Matrix {
  grid: GridElement[][];
  constructor() {
    this.grid = [];
  }

  forEach(callback: (a:GridElement, b:number, c:number)=>void){
    this.grid.forEach((column, x) => {
      column.forEach((value, y)=>{
        callback(value, x, y);
      })
    })
  }

  set(x:number, y:number, value:GridElement){
    if(!this.grid[x] ){
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  get(x:number, y:number){
    const col = this.grid[x];
    if(col){
      return col[y];
    }
    return undefined;
  }
}

export class Vec2 {
    constructor(public x:number, public y:number) { }
  
    set(x:number, y:number){
      this.x = x;
      this.y = y;
    }
  }
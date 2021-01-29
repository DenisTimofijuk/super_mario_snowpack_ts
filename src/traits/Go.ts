import Entity, { Trait } from "../Entity";

export class Go extends Trait{
    dir: number;
    speed: number;
    constructor() {
      super('go');
      this.dir = 0;
      this.speed = 6000;
    }
  
    update(entity:Entity, deltaTime:number){
        entity.vel.x = this.speed * this.dir * deltaTime;
    }
  }
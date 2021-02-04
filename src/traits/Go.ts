import Entity, { Trait } from '../Entity';

export class Go extends Trait {
  dir: number;
  speed: number;
  distance: number;
  constructor() {
    super('go');
    this.dir = 0;
    this.speed = 6000;
    this.distance = 0;
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime;
    if(this.dir){
      this.distance += Math.abs(entity.vel.x) * deltaTime;
    }else{
      this.distance = 0;
    }    
  }
}

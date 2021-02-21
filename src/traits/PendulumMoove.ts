import Entity, { Sides, Trait } from '../Entity';

export class PendulumMoove extends Trait {
  speed: number;
  enabled: boolean;
  constructor() {
    super('pendulummoove');
    this.enabled = true;
    this.speed = -30;
  }

  update(entity: Entity, deltaTime: number) {
    if(this.enabled){
      entity.vel.x = this.speed;
    }    
  }

  obstruct(entity: Entity, side: symbol) {
      if(side === Sides.LEFT || side === Sides.RIGHT){
        this.speed = -this.speed;
      }
  }

  collides(a:Entity, b:Entity){}
}

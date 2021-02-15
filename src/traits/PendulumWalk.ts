import Entity, { Sides, Trait } from '../Entity';

export class PendulumWalk extends Trait {
  speed: number;
  constructor() {
    super('pendulumwalk');
    this.speed = -30;
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed;
  }

  obstruct(entity: Entity, side: symbol) {
      if(side === Sides.LEFT || side === Sides.RIGHT){
        this.speed = -this.speed;
      }
  }
}

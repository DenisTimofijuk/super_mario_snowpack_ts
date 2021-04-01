import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Gravity extends Trait {
  constructor() {
    super('gravity');
  }

  update(gameContext:GameContext, entity: Entity, level?: Level) {
    if(level){
        entity.vel.y += level.gravity * gameContext.deltaTime!;
    }    
  }
}

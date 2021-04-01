import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Velocity extends Trait {
  constructor() {
    super('velocity');
  }

  update(gameContext:GameContext, entity: Entity, level?: Level) {
    entity.pos.x += entity.vel.x * gameContext.deltaTime!;
    entity.pos.y += entity.vel.y * gameContext.deltaTime!;
  }
}

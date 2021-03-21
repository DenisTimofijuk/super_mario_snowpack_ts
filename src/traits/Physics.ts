import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Physics extends Trait {
  constructor() {
    super('physics');
  }

  update(gameContext:GameContext, entity: Entity, level?: Level) {
    entity.pos.x += entity.vel.x * gameContext.deltaTime!;
    level && level.tileCollider!.checkX(entity);

    entity.pos.y += entity.vel.y * gameContext.deltaTime!;
    level && level.tileCollider!.checkY(entity);

    level && (entity.vel.y += level.gravity * gameContext.deltaTime!);
  }
}

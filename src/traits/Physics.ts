import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Physics extends Trait {
  constructor() {
    super('physics');
  }

  update(entity: Entity, deltaTime: number, level?: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level && level.tileCollider!.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level && level.tileCollider!.checkY(entity);

    level && (entity.vel.y += level.gravity * deltaTime);
  }
}

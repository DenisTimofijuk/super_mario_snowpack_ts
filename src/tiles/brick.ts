import type TileResolver from '../TileResolver';
import Entity, { Sides } from '../Entity';
import type { GameContext } from 'src';
import type Level from 'src/level';

export type HandleIncome = {
  entity: Entity
  match: GetByIndexResult
  resolver: TileResolver
  gameContext: GameContext
  level: Level
}

function handleX({entity, match, resolver, gameContext, level}:HandleIncome) {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(Sides.RIGHT, match);
    }
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(Sides.LEFT, match);
    }
  }
}

function handleY({entity, match, resolver, gameContext, level}:HandleIncome) {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Sides.BOTTOM, match);
    }
  } else if (entity.vel.y < 0) {
    if (entity.player) {
      const grid = resolver.matrix;
      grid.delete(match.index_x, match.index_y);
      const goomba = gameContext.entityFactory.goomba();
      goomba.vel.set(50, -400);
      goomba.pos.set(entity.pos.x, match.y1);
      level.entities.add(goomba);
    }

    if (entity.bounds.top < match.y2) {
      entity.obstruct(Sides.TOP, match);
    }
  }
}

export const brick = [handleY, handleX];

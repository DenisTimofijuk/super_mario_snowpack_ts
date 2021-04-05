import type { GameContext } from 'src';
import type Entity from './Entity';
import type Level from './level';
import type { Matrix } from './math';
import TileResolver from './TileResolver';
import { brick } from './tiles/brick';
import { ground } from './tiles/ground';
import { coin } from './tiles/coin';

type Handlers = {
  [K in TyleType]: Function[];
};

const handlers: Handlers = {
  ground,
  sky: [],
  brick,
  coin
};

export default class TileCollider {
  resolvers: TileResolver[];
  constructor() {
    this.resolvers = [];
  }

  addGrid(tileMatrix: Matrix) {
    this.resolvers.push(new TileResolver(tileMatrix));
  }

  checkY(entity: Entity, gameContext:GameContext, level:Level) {
    let y: number;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }
    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        entity.bounds.left,
        entity.bounds.right,
        y,
        y,
      );
      matches.forEach((match) => this.handle(0, entity, match, resolver, gameContext, level));
    }
  }

  checkX(entity: Entity, gameContext:GameContext, level:Level) {
    let x: number;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }
    for (const resolver of this.resolvers) {
      const matches = resolver.searchByRange(
        x,
        x,
        entity.bounds.top,
        entity.bounds.bottom,
      );

      matches.forEach((match) => this.handle(1, entity, match, resolver, gameContext, level));
    }
  }

  handle(index: number, entity: Entity, match: GetByIndexResult, resolver:TileResolver, gameContext:GameContext, level:Level) {
    const tileCollisionContext = {
      entity,
      match,
      resolver,
      gameContext,
      level
    };
    if ('type' in match.tile && match.tile.type) {
      const typeHanlders = handlers[match.tile.type];
      if (typeHanlders[index]) {
        typeHanlders[index](tileCollisionContext);
      }
    }
  }
}

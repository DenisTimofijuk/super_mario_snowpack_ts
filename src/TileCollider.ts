import Entity, { Sides } from './Entity';
import type { Matrix } from './math';
import TileResolver from './TileResolver';

export default class TileCollider {
  tiles: TileResolver;
  constructor(tileMatrix: Matrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkY(entity: Entity) {
    let y:number;
    if (entity.vel.y > 0) {
        y = entity.bounds.bottom;
    }else if(entity.vel.y < 0){
        y = entity.bounds.top;
    }else{
        return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y,
    );

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.top = match.y1 - entity.size.y;
          entity.vel.y = 0;

          entity.obstruct(Sides.BOTTOM);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2;
          entity.vel.y = 0;

          entity.obstruct(Sides.TOP);
        }
      }
    });
  }

  checkX(entity: Entity) {
    let x:number;
    if (entity.vel.x > 0) {
        x = entity.bounds.right;
    }else if(entity.vel.x < 0){
        x = entity.bounds.left;
    }else{
        return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom,
    );

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          // entity.bounds.left = match.x1 - entity.size.x; //removeing this one causes some weird map behaviour
          entity.pos.x = match.x1 - entity.size.x - entity.offset.x;
          entity.vel.x = 0;
          entity.obstruct(Sides.RIGHT);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2;
          entity.vel.x = 0;
          entity.obstruct(Sides.LEFT);
        }
      }
    });
  }
}

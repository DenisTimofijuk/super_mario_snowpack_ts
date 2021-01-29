import type Entity from './Entity';
import type Level from './level';
import type SpriteSheet from './SpriteSheet';

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;
  const context = buffer.getContext('2d')!;

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entities: Set<Entity>) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    entities.forEach((entity) => entity.draw(context));
  };
}

export function createCollisionLayer(level:Level) {
  const resolvedTiles:{x:number, y:number}[] = [];
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndexFale(x:number, y:number) {
    resolvedTiles.push({x, y});
    return getByIndexOriginal.call(tileResolver, x, y);
  }

  return function drawCollision(context:CanvasRenderingContext2D) {
    context.strokeStyle = "blue";
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(x * tileSize, y*tileSize, tileSize, tileSize);
      context.stroke();
    })

    context.strokeStyle = "red";
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
      context.stroke();
    })

    resolvedTiles.length = 0;
  }
}
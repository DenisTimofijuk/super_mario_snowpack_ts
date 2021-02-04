import type Camera from './Camera';
import type Entity from './Entity';
import type Level from './level';
import type SpriteSheet from './SpriteSheet';

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const tiles = level.tiles;
  const resolver = level.tileCollider.tiles;
  const buffer = document.createElement('canvas');
  buffer.width = 256 + 16;
  buffer.height = 240;
  const context = buffer.getContext('2d')!;

  let startIndex:number, endIndex:number;

  function redraw(drawFrom:number, drawTo:number) {
    if(drawFrom === startIndex && drawTo === endIndex){
      return;
    }
    startIndex = drawFrom;
    endIndex = drawTo;

    for(let x = startIndex; x<= endIndex; ++x){
      const col = tiles.grid[x];
      if(col){
        col.forEach((tile, y) => {
          sprites.drawTile(tile.name, context, x - startIndex, y);      
        })
      }
    }
  }

  return function drawBackgroundLayer(context: CanvasRenderingContext2D, camera:Camera) {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);
    context.drawImage(buffer,
        -camera.pos.x % 16
       ,-camera.pos.y
       );
  };
}

export function createSpriteLayer(entities: Set<Entity>, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext('2d')!;

  return function drawSpriteLayer(context: CanvasRenderingContext2D, camera:Camera) {
    entities.forEach((entity) => {
      spriteBufferContext.clearRect(0,0, spriteBuffer.width, spriteBuffer.height);
      entity.draw(spriteBufferContext)
      context.drawImage(spriteBuffer, entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y);
    });
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

  return function drawCollision(context:CanvasRenderingContext2D, camera:Camera) {
    context.strokeStyle = "blue";
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize);
      context.stroke();
    })

    context.strokeStyle = "red";
    level.entities.forEach(entity => {
      context.beginPath();
      context.rect(
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y,
        entity.size.x,
        entity.size.y
        );
      context.stroke();
    })

    resolvedTiles.length = 0;
  }
}

export function createCameraLayer(cameraToDraw:Camera) {
  return function drawCameraRect(context:CanvasRenderingContext2D, fromCamera:Camera) {
    context.strokeStyle  = 'purple';
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
      );
    context.stroke();
  }
}
import type Entity from '../Entity';
import type TileCollider from '../TileCollider';
import type Camera from '../Camera';
import type Level from '../level';
import type TileResolver from 'src/TileResolver';

export function createCollisionLayer(level: Level) {
  if (!level.tileCollider) {
    console.log(
      'level.tileCollider was not found. createCollisionLayer terminated.',
    );
    return;
  }
 
  const drawTileCandidates = level.tileCollider.resolvers.map(createTileCandidateLayer);
  const drawBoundingBoxes = createEntityLayer(level.entities);

  return function drawCollision(
    context: CanvasRenderingContext2D,
    camera: Camera,
  ) {
    drawTileCandidates.forEach(draw => draw(context, camera));
    drawBoundingBoxes(context, camera);
  };
}

function createEntityLayer(entities: Set<Entity>) {
  return function drawBoundingBox(
    context: CanvasRenderingContext2D,
    camera: Camera,
  ) {
    context.strokeStyle = 'red';
    entities.forEach((entity) => {
      context.beginPath();
      context.rect(
        entity.bounds.left - camera.pos.x,
        entity.bounds.top - camera.pos.y,
        entity.size.x,
        entity.size.y,
      );
      context.stroke();
    });
  };
}

function createTileCandidateLayer(tileResolver: TileResolver) {
  const resolvedTiles: { x: number; y: number }[] = [];

  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndexFale(x: number, y: number) {
    resolvedTiles.push({ x, y });
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawTileCandidates(context:CanvasRenderingContext2D, camera:Camera) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({ x, y }) => {
      context.beginPath();
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize,
      );
      context.stroke();
    });

    resolvedTiles.length = 0;
  }
}
import type Entity from "./Entity";
import type { Tyle_JSON } from "./loaders";
import type SpriteSheet from "./SpriteSheet";

export function createBackgroundLayer(backgrounds: Tyle_JSON[], sprites: SpriteSheet) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) =>
    drawBackground(background, buffer.getContext('2d')!, sprites),
  );

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0);
  };
}

export function createSpriteLayer(entity: Entity) {
    return function drawSpriteLayer(context: CanvasRenderingContext2D) {
      entity.draw(context);
    };
  }
  

function drawBackground(
    background: Tyle_JSON,
    context: CanvasRenderingContext2D,
    sprites: SpriteSheet,
  ) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          sprites.drawTile(background.tile, context, x, y);
        }
      }
    });
  }
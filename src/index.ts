import { loadImage, loadLevel, Tyle_JSON } from './loaders';
import SpriteSheet from './SpriteSheet';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

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

loadImage('./img/tiles.png').then((image) => {
  const sprites = new SpriteSheet(image, 16, 16);
  sprites.define('ground', 0, 0);
  sprites.define('sky', 3, 23);

  loadLevel('1-1').then((level) => {
    level.backgrounds.forEach(background => drawBackground(background, ctx, sprites));
  });
});

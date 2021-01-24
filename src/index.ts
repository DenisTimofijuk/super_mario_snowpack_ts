import Compositor from './Compositor';
import { createBackgroundLayer, createSpriteLayer } from './layers';
import { loadLevel } from './loaders';
import { loadMarioSprite, loadBackgroundSprites } from './sprites';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([marioSprite, backgroundsprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundsprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(ctx);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }

  update();
});

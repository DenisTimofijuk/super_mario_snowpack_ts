import Compositor from './Compositor';
import { createMario } from './entities';
import { createBackgroundLayer, createSpriteLayer } from './layers';
import { loadLevel } from './loaders';
import { loadBackgroundSprites } from './sprites';
import Timer from './Timer';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

Promise.all([createMario(), loadBackgroundSprites(), loadLevel('1-1')]).then(
  ([mario, backgroundsprites, level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(
      level.backgrounds,
      backgroundsprites,
    );
    comp.layers.push(backgroundLayer);

    const GRAVITY = 30;
    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
      comp.draw(ctx);
      mario.update(deltaTime);
      mario.vel.y += GRAVITY;
    };
    timer.start();
  },
);

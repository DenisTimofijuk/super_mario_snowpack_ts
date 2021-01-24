import Compositor from './Compositor';
import { createMario } from './entities';
import KeyboardState from './keyboardState';
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

    const GRAVITY = 2000;
    mario.pos.set(64, 180);

    const input = new KeyboardState();
    input.addMapping('Space', (keystate) => {
      if(keystate){
        mario.jump.start()
      }else{
        mario.jump.cancel()
      }
    });
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
      comp.draw(ctx);
      mario.update(deltaTime);
      mario.vel.y += GRAVITY * deltaTime;
    };
    timer.start();
  },
);

// window.addEventListener('keypress', event => console.log(event))

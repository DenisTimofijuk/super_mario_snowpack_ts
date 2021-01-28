import { createMario } from './entities';
import KeyboardState from './keyboardState';
import { loadLevel } from './loaders';
import Timer from './Timer';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

Promise.all([createMario(), loadLevel('1-1')]).then(
  ([mario, level]) => {
    const GRAVITY = 2000;
    mario.pos.set(64, 64);

    level.entities.add(mario);

    const input = new KeyboardState();
    input.addMapping('Space', (keystate) => {
      if(keystate){
        mario.jump.start()
      }else{
        mario.jump.cancel()
      }
    });
    input.listenTo(window);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
      level.comp.draw(ctx);
      level.update(deltaTime);
      mario.vel.y += GRAVITY * deltaTime;
    };
    timer.start();
  },
);

// window.addEventListener('keypress', event => console.log(event))

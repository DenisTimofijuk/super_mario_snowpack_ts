import Camera from './Camera';
import { setupMouseControl } from './debug';
import { createMario } from './entities';
import { setupKeyboard } from './input';
import { createCollisionLayer } from './layers';
import { loadLevel } from './loaders';
import Timer from './Timer';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

Promise.all([createMario(), loadLevel('1-1')]).then(
  ([mario, level]) => {
    const camera = new Camera();

    mario.pos.set(64, 64);

    level.comp.layers.push(createCollisionLayer(level))

    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window); 

    setupMouseControl(canvas, mario, camera);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
      level.comp.draw(ctx, camera);
      level.update(deltaTime);
    };
    timer.start();
  },
);

//  window.addEventListener('keyup', event => console.log(event))

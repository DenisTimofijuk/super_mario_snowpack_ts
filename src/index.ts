import Camera from './Camera';
import { setupMouseControl } from './debug';
import { setupKeyboard } from './input';
import { loadLevel } from './vaLoaders/level';
import Timer from './Timer';
import { loadMario } from './appEntities/mario';
import { loadGoomba } from './appEntities/Goomba';
import { loadKoopa } from './appEntities/Koopa';

const canvas = document.getElementById('screen') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

Promise.all([loadMario(), loadGoomba(), loadKoopa(), loadLevel('1-1')]).then(
  ([createMario, createGoomba, createKoopa, level]) => {
    const camera = new Camera();

    const mario = createMario();
    mario.pos.set(64, 64);
    level.entities.add(mario);

    const goomba = createGoomba();
    goomba.pos.x = 220;
    level.entities.add(goomba);

    const koopa = createKoopa();
    koopa.pos.x = 260;
    level.entities.add(koopa);

    const input = setupKeyboard(mario);
    input.listenTo(window); 

    // setupMouseControl(canvas, mario, camera);

    const timer = new Timer();
    timer.update = function update(deltaTime: number) {
      level.update(deltaTime);
      if(mario.pos.x > 100){
        camera.pos.x = mario.pos.x - 100;
      }
      level.comp.draw(ctx, camera);
    };
    timer.start();
  },
);

//  window.addEventListener('keyup', event => console.log(event))

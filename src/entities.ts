import { createAnim } from './anim';
import Entity from './Entity';
import { loadSpriteSheet } from './loaders';
import { Go } from './traits/Go';
import { Jump } from './traits/Jump';


export async function createMario() {
  const sprite = await loadSpriteSheet('mario');
  const mario = new Entity();
  mario.size.set(14, 16);
  mario.addTrait(new Go());
  mario.addTrait(new Jump());
  
  const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10);
  function routeMario(mario:Entity): MarioFrameName {
    if(mario.go.dir !== 0){
      return runAnim(mario.go.distance) as MarioFrameName;
    }

    return 'idle';
  }

  mario.draw = function (context: CanvasRenderingContext2D) {
    sprite.draw(routeMario(this), context, 0, 0, mario.go.heading < 0);
  };
  return mario;
}

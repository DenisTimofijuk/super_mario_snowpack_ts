import Entity from './Entity';
import { loadMarioSprite } from './sprites';
import { Go } from './traits/Go';
import { Jump } from './traits/Jump';

export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());
    
    mario.draw = function (context: CanvasRenderingContext2D) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}

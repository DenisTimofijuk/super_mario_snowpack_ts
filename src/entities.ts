import Entity from './Entity';
import { loadMarioSprite } from './sprites';
import { Jump } from './traits/Jump';
import { Velocity } from './traits/Velocity';

export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity();
    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function (context: CanvasRenderingContext2D) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}

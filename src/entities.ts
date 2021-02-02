import Entity from './Entity';
import { loadMarioSprite } from './sprites';
import { Go } from './traits/Go';
import { Jump } from './traits/Jump';

export async function createMario() {
  const sprite = await loadMarioSprite();
  const mario = new Entity();
  mario.size.set(14, 16);
  mario.addTrait(new Go());
  mario.addTrait(new Jump());
  // mario.addTrait(new Velocity());
  mario.draw = function (context: CanvasRenderingContext2D) {
    sprite.draw('idle', context, 0, 0);
  };
  return mario;
}

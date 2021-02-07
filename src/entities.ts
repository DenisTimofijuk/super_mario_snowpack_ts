import { createAnim } from './anim';
import Entity from './Entity';
import type { KeyState } from './keyboardState';
import { loadSpriteSheet } from './loaders';
import { Go } from './traits/Go';
import { Jump } from './traits/Jump';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export async function createMario() {
  const sprite = await loadSpriteSheet('mario');
  const mario = new Entity();
  mario.size.set(14, 16);
  mario.addTrait(new Go());
  mario.go.dragFactor = SLOW_DRAG;
  mario.addTrait(new Jump());

  mario.turbo = function setTurboState(turboOn: KeyState) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
  };

  const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 6);
  function routeFrame(mario: Entity): MarioFrameName {
    if (mario.jump.falling) {
      return 'jump';
    }
    if (mario.go.distance > 0) {
      if (
        (mario.vel.x > 0 && mario.go.dir < 0) ||
        (mario.vel.x < 0 && mario.go.dir > 0)
      ) {
        return 'break';
      }
      return runAnim(mario.go.distance) as MarioFrameName;
    }

    return 'idle';
  }

  mario.draw = function drawMario(context: CanvasRenderingContext2D) {
    sprite.draw(routeFrame(this), context, 0, 0, mario.go.heading < 0);
  };
  return mario;
}

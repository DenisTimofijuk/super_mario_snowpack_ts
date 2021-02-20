import type SpriteSheet from '../SpriteSheet';
import Entity from '../Entity';
import type { KeyState } from '../keyboardState';
import { loadSpriteSheet } from '../loaders';
import { Go } from '../traits/Go';
import { Jump } from '../traits/Jump';
import { Stomper } from '../traits/Stomper';
import { Killable } from '../traits/Killable';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadMario() {
  return loadSpriteSheet('mario').then(createMarioFactory);
}

function createMarioFactory(sprite: SpriteSheet) {
  const runAnim = sprite.animation.get('run');

  function routeFrame(mario: Entity): MarioFrameName {
    if (mario.jump && mario.jump.falling) {
      return 'jump';
    }
    if (mario.go && mario.go.distance > 0) {
      if (
        (mario.vel.x > 0 && mario.go.dir < 0) ||
        (mario.vel.x < 0 && mario.go.dir > 0)
      ) {
        return 'break';
      }
      return  runAnim !== undefined ? runAnim(mario.go.distance) as MarioFrameName : 'idle';
    }

    return 'idle';
  }

  function setTurboState(this: Entity, turboOn: KeyState) {
    this.go && (this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG);
  }

  function drawMario(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go && this.go.heading < 0);
  }

  return function createMario() {
    const mario = new Entity();
    mario.size.set(14, 16);
    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    mario.addTrait(new Killable());
    mario.addTrait(new Stomper());

    mario.killable!.removeAfter = 0;

    mario.turbo = setTurboState.bind(mario);
    mario.draw = drawMario.bind(mario);
    mario.turbo(0);

    return mario;
  };
}

import type SpriteSheet from '../SpriteSheet';
import Entity from '../Entity';
import type { KeyState } from '../keyboardState';
import { Go } from '../traits/Go';
import { Jump } from '../traits/Jump';
import { Stomper } from '../traits/Stomper';
import { Killable } from '../traits/Killable';
import { Solid } from '../traits/Solid';
import { Physics } from '../traits/Physics';
import { loadAudioBoard } from '../vaLoaders/audio';
import type AudioBoard from '../AudioBoard';
import { loadSpriteSheet } from '../vaLoaders/sprite';

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

export function loadMario(audioContext: AudioContext) {
  return Promise.all([
    loadSpriteSheet('mario'),
    loadAudioBoard('mario', audioContext)
  ]).then( ([sprite, audio]) => {
    return createMarioFactory(sprite, audio)
  })
}

function createMarioFactory(sprite: SpriteSheet, audio: AudioBoard) {
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
    mario.audio = audio;
    mario.size.set(14, 16);

    mario.addTrait(new Physics());
    mario.addTrait(new Solid());
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

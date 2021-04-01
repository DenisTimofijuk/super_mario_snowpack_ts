import type { GameContext } from '../index';
import type Level from 'src/level';
import Entity, { Sides, Trait } from '../Entity';

export class Jump extends Trait {
  duration: number;
  velocity: number;
  engageTime: number;
  ready: number;
  requestTime: number;
  gracePeriod: number;
  speedBoost: number;
  constructor() {
    super('jump');
    this.duration = 0.3;
    this.velocity = 200;
    this.engageTime = 0;
    this.ready = 0;
    this.requestTime = 0;
    this.gracePeriod = 0.1;
    this.speedBoost = 0.3;
  }

  update(gameContext:GameContext, entity: Entity, level:Level) {
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        // entity.audio.playAudio('jump', gameContext.audioContext);
        entity.sounds.add('jump');
        this.engageTime = this.duration;
        this.requestTime = 0;
      }
      this.requestTime -= gameContext.deltaTime!;
    }

    if (this.engageTime > 0) {
      entity.vel.y = -(
        this.velocity +
        Math.abs(entity.vel.x) * this.speedBoost
      );
      this.engageTime -= gameContext.deltaTime!;
    }
    this.ready--;
  }

  get falling() {
    return this.ready < 0;
  }

  start() {
    this.requestTime = this.gracePeriod;
  }

  obstruct(entity: Entity, side: symbol) {
    if (side === Sides.BOTTOM) {
      this.ready = 1;
    } else if (side === Sides.TOP) {
      this.cancel();
    }
  }

  cancel() {
    this.engageTime = 0;
    this.requestTime = 0;
  }

  // collides(a:Entity, b:Entity){}
}

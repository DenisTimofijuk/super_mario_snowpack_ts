import Entity, { Trait } from '../Entity';
import type SpriteSheet from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { PendulumMoove } from '../traits/PendulumMoove';
import { Killable } from '../traits/Killable';
import { Solid } from '../traits/Solid';
import { Physics } from '../traits/Physics';

export function loadKoopa() {
  return loadSpriteSheet('koopa').then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');
export class Behavior extends Trait {
  state: Symbol;
  hideTime: number;
  hideDuration: number;
  panicSpeed: number;
  wakeSpeed: number | null;
  constructor() {
    super('behavior');
    this.state = STATE_WALKING;
    this.hideTime = 0;
    this.hideDuration = 5;
    this.panicSpeed = 300;
    this.wakeSpeed = null;
  }

  collides(us: Entity, them: Entity) {
    if (us.killable && us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        this.handleNuge(us, them);
      }
    }
  }

  handleNuge(us: Entity, them: Entity) {
    if (this.state === STATE_WALKING) {
      them.killable && them.killable.kill();
    }else if(this.state === STATE_HIDING){
      this.painc(us, them);
    } else if(this.state === STATE_PANIC){
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);
      if(travelDir !== 0 && travelDir !== impactDir){
        them.killable?.kill();
      }
    }
  }

  handleStomp(us: Entity, them: Entity) {
    if (this.state === STATE_WALKING) {
      this.hide(us);
    } else if (this.state === STATE_HIDING) {
      us.killable?.kill();
      us.vel.set(100, -200);
      us.solid && (us.solid.obstructs = false);
    }else if(this.state === STATE_PANIC){
      this.hide(us);
    }
  }

  painc(us:Entity, them:Entity){
    us.pendulummoove && (us.pendulummoove.enabled = true);
    us.pendulummoove && (us.pendulummoove.speed = this.panicSpeed * Math.sign(them.vel.x));
    this.state = STATE_PANIC;
  }

  hide(us: Entity) {
    if(this.wakeSpeed === null){
      us.pendulummoove && (this.wakeSpeed = us.pendulummoove.speed);
    }
    us.vel.x = 0;
    us.pendulummoove && (us.pendulummoove.enabled = false);
    this.state = STATE_HIDING;
    this.hideTime = 0;
  }

  unhide(us: Entity) {
    this.wakeSpeed !== null && us.pendulummoove && (us.pendulummoove.speed = this.wakeSpeed);
    us.pendulummoove && (us.pendulummoove.enabled = true);
    this.state = STATE_WALKING;
  }

  obstruct() {}

  update(us: Entity, deltaTime: number) {
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime;
      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    }
  }
}

function createKoopaFactory(sprite: SpriteSheet) {
  const walkAnim = sprite.animation.get('walk')!;
  const wakeAnim = sprite.animation.get('wake')!;

  function routeAnim(koopa: Entity): SpriteSheetName {
    if (
      koopa.behavior &&
      'state' in koopa.behavior &&
      koopa.behavior.state === STATE_HIDING
    ) {
      if(koopa.behavior.hideTime > 3){
        return wakeAnim(koopa.behavior.hideTime);
      }
      return 'hiding';
    }

    if (
      koopa.behavior &&
      'state' in koopa.behavior &&
      koopa.behavior.state === STATE_PANIC
    ) {
      return 'hiding';
    }

    return walkAnim(koopa.lifetime);
  }

  function drawKoopa(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
  }

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.addTrait(new Physics());
    koopa.addTrait(new Solid());
    koopa.addTrait(new PendulumMoove());
    koopa.addTrait(new Behavior());
    koopa.addTrait(new Killable());
    koopa.draw = drawKoopa.bind(koopa);

    return koopa;
  };
}

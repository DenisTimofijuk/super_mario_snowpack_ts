import Entity, { Trait } from '../Entity';
import type SpriteSheet from '../SpriteSheet';
import { PendulumMoove } from '../traits/PendulumMoove';
import { Killable } from '../traits/Killable';
import { Solid } from '../traits/Solid';
import { Physics } from '../traits/Physics';
import { loadSpriteSheet } from '../vaLoaders/sprite';

export function loadGoomba(audioContext:AudioContext) {
  return loadSpriteSheet('goomba').then(createGoombaFactory);
}

export class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  collides(us: Entity, them: Entity) {
    if (us.killable && us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        us.killable && us.killable.kill();
        us.pendulummoove && (us.pendulummoove.speed = 0);
      }else{
          them.killable && them.killable.kill();
      }
    }
  }

  obstruct() {}

  update() {}
}

function createGoombaFactory(sprite: SpriteSheet) {
  const walkAnim = sprite.animation.get('walk')!;

  function routeAnim(goomba: Entity): SpriteSheetName {
    if (goomba.killable && goomba.killable.dead) {
      return 'flat';
    }
    return walkAnim(goomba.lifetime);
  }

  function drawGoomba(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw(routeAnim(this), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.addTrait(new Physics());
    goomba.addTrait(new Solid());
    goomba.addTrait(new PendulumMoove());
    goomba.addTrait(new Behavior());
    goomba.addTrait(new Killable());
    goomba.draw = drawGoomba.bind(goomba);

    return goomba;
  };
}

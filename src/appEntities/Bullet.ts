import Entity, { Trait } from '../Entity';
import type SpriteSheet from '../SpriteSheet';
import { loadSpriteSheet } from '../loaders';
import { Killable } from '../traits/Killable';
import { Velocity } from '../traits/Velocity';
import type { GameContext } from 'src';
import type Level from '../level';
import { Gravity } from '../traits/Gravity';

export function loadBullet(audioContext:AudioContext) {
  return loadSpriteSheet('bullet-bill').then(createGoombaFactory);
}

export class Behavior extends Trait {
  gravity: Gravity;
  constructor() {
    super('behavior');
    this.gravity = new Gravity();
  }

  collides(us: Entity, them: Entity) {
    if (us.killable && us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        us.killable && us.killable.kill();
        us.vel.set(100, -200);
      }else{
          them.killable && them.killable.kill();
      }
    }
  }

  obstruct() {}

  update(gameContext:GameContext, entity: Entity, level?: Level) {
    if(entity.killable?.dead){
      this.gravity.update(gameContext, entity, level);
    }
  }
}

function createGoombaFactory(sprite: SpriteSheet) {
  function drawBullet(this: Entity, context: CanvasRenderingContext2D) {
    sprite.draw('bullet', context, 0, 0, this.vel.x < 0);
  }

  return function createGoomba() {
    const bullet = new Entity();
    bullet.size.set(16, 14);

    bullet.addTrait(new Velocity());
    bullet.addTrait(new Behavior());
    bullet.addTrait(new Killable());
    bullet.draw = drawBullet.bind(bullet);

    return bullet;
  };
}

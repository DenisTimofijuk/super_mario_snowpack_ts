import Entity from './Entity';
import { loadMarioSprite } from './sprites';

export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity();

    mario.update = function updateMario(time:number) {
      this.pos.x += this.vel.x * time;
      this.pos.y += this.vel.y * time;
    };

    mario.draw = function (context: CanvasRenderingContext2D) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}

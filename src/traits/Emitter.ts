import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Emitter extends Trait {
  interval: number;
  coolDown: number;
  emitters: Array<(a:Entity, b?:Level)=>void>;
  constructor() {
    super('emitter');
    this.interval = 2;
    this.coolDown = this.interval;
    this.emitters = <any>[];
  }

  update(gameContext: GameContext, entity: Entity, level?: Level) {
      this.coolDown -= gameContext.deltaTime!;
      if(this.coolDown <= 0){
        this.emit(entity, level);
        this.coolDown = this.interval;
      }
  }

  emit(entity:Entity, level?:Level){
    for(const emitter of this.emitters){
        emitter(entity, level);
    }
  }
}

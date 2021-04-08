import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';
import { Stomper } from './Stomper';

const COIN_LIFE_THRESHOLD = 100;
export class Player extends Trait {
  lives: number;
  score: number;
  coins: number;
  playerName: string;
  constructor() {
    super('player');
    this.coins = 0;
    this.lives = 3;
    this.score = 0;
    this.playerName = 'UNNAMED';

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100;
    });
  }

  addCoins(count:number){
    this.coins += count;
    this.queue( (entity: Entity) => {entity.sounds.add('coin')} );

    while(this.coins >= COIN_LIFE_THRESHOLD){
      this.addLifes(1);
      this.coins -= COIN_LIFE_THRESHOLD;
    }
  }
  addLifes(count:number){
    this.lives += count;
  }
}

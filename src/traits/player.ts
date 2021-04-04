import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';
import { Stomper } from './Stomper';

export class Player extends Trait {
  lives: number;
  score: number;
  coins: number;
  constructor() {
    super('player');
    this.coins = 0;
    this.lives = 3;
    this.score = 0;

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100;
      console.log("Scrore", this.score);
    });
  }
}

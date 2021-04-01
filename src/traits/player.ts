import type { GameContext } from '../index';
import Entity, { Trait } from '../Entity';
import type Level from '../level';

export class Player extends Trait {
  lives: number;
  score: number;
  constructor() {
    super('player');
    this.lives = 3;
    this.score = 0;
  }
}

import type { KeyState } from './keyboardState';
import { Vec2 } from './math';
import type { Go } from './traits/Go';
import type { Jump } from './traits/Jump';
import type { PendulumWalk } from './traits/PendulumWalk';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('ryght')
};
export abstract class Trait {
  constructor(public readonly NAME: TraitName) {}

  abstract obstruct(a: Entity, b: symbol): void;
  abstract update(a: Entity, b: number): void;
}

export type TraitType = Jump | Go | PendulumWalk;
type TraitTypeTSworkaround = Jump & Go & PendulumWalk;
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<TraitType>;
  jump!: Jump;
  go!: Go;
  pendulumwalk!: PendulumWalk;
  size: Vec2;
  lifetime: number;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.lifetime = 0;
    this.traits = [];
  }

  addTrait(trait: TraitType) {
    this.traits.push(trait);
    this[trait.NAME] = trait as TraitTypeTSworkaround;
  }

  obstruct(side: symbol) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  update(deltatime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltatime);
    });

    this.lifetime += deltatime;
  }

  draw(a: CanvasRenderingContext2D) {}

  turbo(a: KeyState) {}
}

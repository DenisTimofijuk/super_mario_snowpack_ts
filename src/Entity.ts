import type { KeyState } from './keyboardState';
import { Vec2 } from './math';
import type { Go } from './traits/Go';
import type { Jump } from './traits/Jump';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
};
export class Trait {
  constructor(public readonly NAME: TraitName) {}

  obstruct(a: Entity, b: symbol) {}

  update(a: Entity, b: number) {
    console.warn('Unhandled update call in Trait');
  }
}

type TraitType = Jump | Go;
type TraitTypeTSworkaround = Jump & Go;
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<TraitType>;
  jump!: Jump;
  go!: Go;
  size: Vec2;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
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
  }

  draw(a: CanvasRenderingContext2D) {}

  turbo(a: KeyState) {}
}

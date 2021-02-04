import { Vec2 } from './math';
import type { Go } from './traits/Go';
import type { Jump } from './traits/Jump';

export class Trait {
  constructor(public readonly NAME: TraitName) { }

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
  go!:Go;
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

  update(deltatime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltatime);
    });
  }

  draw(context: CanvasRenderingContext2D) {}
}
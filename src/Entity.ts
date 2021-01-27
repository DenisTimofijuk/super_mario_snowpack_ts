import { Vec2 } from './math';
import type { Jump } from './traits/Jump';
import type { Velocity } from './traits/Velocity';

type TraitName = 'jump' | 'velocity';
export class Trait {
  constructor(public readonly NAME: TraitName) { }

  update(a: Entity, b: number) {
    console.warn('Unhandled update call in Trait');
  }
}

type TraitType = Jump | Velocity;
type TraitTypeTSworkaround = Jump & Velocity;
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<TraitType>;
  jump!: Jump;
  velocity!: Velocity;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
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
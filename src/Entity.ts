import { Vec2 } from './math';
import type { Jump } from './traits/Jump';
import type { Velocity } from './traits/Velocity';

type TraitName = 'jump' | 'velocity';
export class Trait {
  // NAME: TraitName;
  duration!: number;
  velocity!: number;
  engageTime!: number;
  constructor(public readonly NAME: TraitName) {
    // this.NAME = name;
  }

  update(a: Entity, b: number) {
    console.warn('Unhandled update call in Trait');
  }

  start() {}

  cancel() {}
}
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Trait[];
  jump!: Jump;
  velocity!: Velocity;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.traits = [];
  }

  addTrait(trait: Trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltatime: number) {
    this.traits.forEach((trait) => {
      trait.update(this, deltatime);
    });
  }

  draw(context: CanvasRenderingContext2D) {}
}

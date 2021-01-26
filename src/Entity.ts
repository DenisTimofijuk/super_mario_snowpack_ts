import { Vec2 } from './math';
import type { Jump } from './traits/Jump';
import type { Velocity } from './traits/Velocity';

type TraitName = 'jump' | 'velocity';
export class Trait {
  duration!: number; //TS workaround
  velocity!: number; //TS workaround
  engageTime!: number; //TS workaround
  constructor(public readonly NAME: TraitName) { }

  update(a: Entity, b: number) {
    console.warn('Unhandled update call in Trait');
  }

  start(){} //TS workaround

  cancel(){} //TS workaround
}
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<Jump | Velocity>;
  jump!: Jump;
  velocity!: Velocity;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.traits = [];
  }

  addTrait(trait: Jump | Velocity) {
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
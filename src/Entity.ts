import type { Behavior as GoombaBehaviour } from './appEntities/Goomba';
import type { Behavior as KoopaBehaviour } from './appEntities/Koopa';
import BoundingBox from './boundingBox';
import type { KeyState } from './keyboardState';
import type Level from './level';
import { Vec2 } from './math';
import type { Go } from './traits/Go';
import type { Jump } from './traits/Jump';
import type { Killable } from './traits/Killable';
import type { PendulumMoove } from './traits/PendulumMoove';
import type { PlayerController } from './traits/PlayerController';
import type { Stomper } from './traits/Stomper';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('ryght')
};
export class Trait {
  tasks: Function[];
  constructor(public readonly NAME: TraitName) {
    this.tasks = [];
  }

  obstruct(a: Entity, b: symbol){};
  update(a: Entity, b: number){};
  collides(a: Entity, b:Entity){};

  queue(task:Function){
    this.tasks.push(task);
  }

  finalize(){
    this.tasks.forEach(task => task());
    this.tasks.length = 0;
  }
}

export type TraitType = Jump | Go | PendulumMoove | GoombaBehaviour | Stomper | Killable | PlayerController | KoopaBehaviour;
type TraitTypeTSworkaround = Jump & Go & PendulumMoove & GoombaBehaviour & Stomper & Killable & PlayerController & KoopaBehaviour;
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<TraitType>;
  jump?: Jump;
  go?: Go;
  behavior?: GoombaBehaviour | KoopaBehaviour;
  pendulummoove?: PendulumMoove;
  stomper?: Stomper;
  killable? :Killable;
  playercontroller?: PlayerController;
  size: Vec2;
  lifetime: number;
  offset: Vec2;
  bounds: BoundingBox;
  canCollide: boolean;
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifetime = 0;
    this.canCollide = true;
    
    this.traits = [];
  }

  addTrait(trait: TraitType) {
    this.traits.push(trait);
    this[trait.NAME] = trait as TraitTypeTSworkaround;
  }

  collides(candidate:Entity){
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }

  obstruct(side: symbol) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }

  update(deltatime: number, level:Level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltatime, level);
    });

    this.lifetime += deltatime;
  }

  draw(a: CanvasRenderingContext2D) {}

  turbo(a: KeyState) {}

  finalize(){
    this.traits.forEach(trait => trait.finalize());
  }
}


export function displayMissingTrait(entityName:string, name:TraitName) {
  console.warn(`[${name}] trait was not found on ${entityName}`);
}
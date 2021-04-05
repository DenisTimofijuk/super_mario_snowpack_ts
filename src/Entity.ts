import type { GameContext } from './index';
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
import type { Physics } from './traits/Physics';
import type { PlayerController } from './traits/PlayerController';
import type { Solid } from './traits/Solid';
import type { Stomper } from './traits/Stomper';
import type AudioBoard from './AudioBoard';
import EventEmitter from './eventEmiter';
import type { Velocity } from './traits/Velocity';
import type { Gravity } from './traits/Gravity';
import type { Emitter } from './traits/Emitter';
import type { Player } from './traits/player';
import EventBuffer from './EventBuffer';
import type LevelTimer from './traits/LevelTimer';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('ryght')
};
export class Trait {
  static EVENT_TASK = Symbol('task');

  listeners: Array<{name:Symbol, callback:()=>void, count:number}>;
  constructor(public readonly NAME: TraitName) {
    this.listeners = [];
  }

  listen(name:Symbol, callback:()=>void, count = Infinity){
    const listener = {name, callback, count};
    this.listeners.push(listener);
  }

  obstruct(a: Entity, b: symbol, c: GetByIndexResult){};
  update(a:GameContext, b: Entity, c: Level){};
  collides(a: Entity, b:Entity){};

  queue(task:()=>void){
    this.listen(Trait.EVENT_TASK, task, 1);
  }

  finalize(entity:Entity){
    this.listeners = this.listeners.filter(listener => {
      entity.events.process(listener.name, listener.callback);
      return --listener.count;
    });
  }
}

export type TraitType = Jump | Go | PendulumMoove | GoombaBehaviour | Stomper | Killable | PlayerController | KoopaBehaviour | Solid | Physics | Velocity | Gravity | Emitter | Player | LevelTimer;
type TraitTypeTSworkaround = Jump & Go & PendulumMoove & GoombaBehaviour & Stomper & Killable & PlayerController & KoopaBehaviour & Solid & Physics & Velocity & Gravity & Emitter & Player & LevelTimer;
export default class Entity {
  pos: Vec2;
  vel: Vec2;
  traits: Array<TraitType>;
  jump?: Jump;
  go?: Go;
  solid?:Solid;
  behavior?: GoombaBehaviour | KoopaBehaviour;
  pendulummoove?: PendulumMoove;
  stomper?: Stomper;
  killable? :Killable;
  physics?:Physics;
  playercontroller?: PlayerController;
  size: Vec2;
  lifetime: number;
  offset: Vec2;
  bounds: BoundingBox;
  audio: AudioBoard;
  velocity?: Velocity;
  gravity?:Gravity;
  emitter?: Emitter;
  sounds: Set<AudioName>;
  player?: Player;
  events: EventBuffer;
  leveltimer?: LevelTimer;
  constructor() {
    this.audio = <any>{};
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifetime = 0;
    this.sounds = new Set();
    this.events = new EventBuffer();
    
    this.traits = [];
  }

  playSounds(audioBoard:AudioBoard, context:AudioContext){
    this.sounds.forEach(name => {
      audioBoard.playAudio(name, context);
    });
    this.sounds.clear();
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

  obstruct(side: symbol, match:GetByIndexResult) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
    });
  }

  update(gameContext:GameContext, level:Level) {
    this.traits.forEach((trait) => {
      trait.update(gameContext, this, level);  
    });
    
    this.playSounds(this.audio, gameContext.audioContext);

    this.lifetime += gameContext.deltaTime!;
  }

  draw(a: CanvasRenderingContext2D) {}

  turbo(a: KeyState) {}

  finalize(){
    this.events.emit(Trait.EVENT_TASK);
    this.traits.forEach(trait => trait.finalize(this));
    this.events.clear();
  }
}


export function displayMissingTrait(entityName:string, name:TraitName) {
  console.warn(`[${name}] trait was not found on ${entityName}`);
}
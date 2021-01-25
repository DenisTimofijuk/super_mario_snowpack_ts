export {};

class Entity {
  pos: number;
  vel: number;
  traits: Trait[];
  constructor() {
    this.pos = 0;
    this.vel = 0;
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

type TraitName = "jump" | "velocity";

class Trait {
  NAME: TraitName;
  constructor(name: TraitName) {
    this.NAME = name;
  }

  update(a: Entity, b: number) {
    console.warn("Unhandled update call in Trait");
  }
}

class Jump extends Trait{
    duration: number;
    velocity: number;
    engageTime: number;
    constructor() {
      super('jump');
      this.duration = 0.5;
      this.velocity = 200;
      this.engageTime = 0;
    }
  
    update(entity:Entity, deltaTime:number){
      if(this.engageTime > 0){
        entity.vel = -this.velocity;
        this.engageTime -= deltaTime;
      }
    }

    start(){
        this.engageTime = this.duration;
    }

    cancel(){
        this.engageTime = 0;
    }
  }
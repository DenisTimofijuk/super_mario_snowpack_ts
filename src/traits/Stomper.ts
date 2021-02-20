import Entity, { Trait } from "../Entity";

export class Stomper extends Trait{
    queueBounce: boolean;
    bounceSpeed: number;
    constructor() {
        super('stomper');
        this.queueBounce = false;
        this.bounceSpeed = 400;
    }

    bounce(){
        this.queueBounce = true;
    }

    collides(a: Entity, b:Entity){}

    obstruct(){}

    update(entity:Entity){
        if(this.queueBounce){
            entity.vel.y = -this.bounceSpeed;
            this.queueBounce = false;
        }
    }
}
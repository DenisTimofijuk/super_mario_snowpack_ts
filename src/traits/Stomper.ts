import Entity, { Trait } from "../Entity";

export class Stomper extends Trait{
    static EVENT_STOMP = Symbol('stomp');

    bounceSpeed: number;
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;
    }

    bounce(us:Entity, them:Entity){
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us: Entity, them:Entity){
        if(!them.killable || them.killable.dead){
            return;
        }

        if(us.vel.y > them.vel.y){
            this.queue(()=> this.bounce(us, them));            
            us.sounds.add('stomp');
            us.events.emit(Stomper.EVENT_STOMP);
        }
    }
}
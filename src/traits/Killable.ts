import type Level from "src/level";
import Entity, { Trait } from "../Entity";

export class Killable extends Trait{
    dead: boolean;
    deadTime: number;
    removeAfter: number;
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2; //secound
    }

    kill(){
        this.queue(()=>{this.dead = true});
    }

    revive(){
        this.dead = false;
        this.deadTime = 0;
    }

    collides(a: Entity, b:Entity){}

    obstruct(){}

    update(entity: Entity, deltaTime:number, level?:Level){
        if(this.dead){
            this.deadTime += deltaTime;
            if(this.deadTime > this.removeAfter){
                level && level.entities.delete(entity);
            }
        }
    }
}
import { Vec2 } from "../math";
import Entity, { Trait } from "../Entity";
import type Level from "../level";

export class PlayerController extends Trait{
    player: Entity;
    checkpoint: Vec2;
    time: number;
    score: number;
    constructor() {
        super('playercontroller');
        this.player = <any>{};
        this.checkpoint = new Vec2(0, 0);
        this.time = 300;
        this.score = 0;
    }

    setPlayer(entity:Entity){
        this.player = entity;
        if(this.player.stomper){
            this.player.stomper.onStomp = () => {
                this.score += 100;
            }
        }
    }

    collides(){}
    obstruct(){}

    update(entity:Entity, deltaTime:number, level?:Level){
        if(!level?.entities.has(this.player)){
            this.player.killable?.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level?.entities.add(this.player);
        }else{
            this.time -= deltaTime * 2;
        }
    }
}
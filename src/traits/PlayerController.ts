import { Vec2 } from "../math";
import Entity, { Trait } from "../Entity";
import type Level from "../level";
import type { GameContext } from "../index";
import { Stomper } from "./Stomper";

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
        
        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100;
        })
        
    }

    setPlayer(entity:Entity){
        this.player = entity;
    }

    collides(){}
    obstruct(){}

    update(gameContext:GameContext, entity:Entity, level?:Level){
        if(!level?.entities.has(this.player)){
            this.player.killable?.revive();
            this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
            level?.entities.add(this.player);
        }else{
            this.time -= gameContext.deltaTime! * 2;
        }
    }
}
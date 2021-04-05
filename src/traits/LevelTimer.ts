import type { GameContext } from "../index";
import Entity, { Trait } from "../Entity";
import type Level from "../level";

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol('timer hurry');
    static EVENT_TIMER_OK = Symbol('timer ok');

    totalTime: number;
    currentTime: any;
    hurryTime: number;
    hurryEmitted: boolean | null;
    constructor() {
        super('leveltimer');
        this.totalTime = 300;
        this.currentTime = this.totalTime;
        this.hurryTime = 100;
        this.hurryEmitted = null;
    }

    update(gameContext:GameContext, entity:Entity, level?:Level){
        this.currentTime -= gameContext.deltaTime! * 2;
        if(this.hurryEmitted !== true && this.currentTime < this.hurryTime){
            level?.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }
        if(this.hurryEmitted !== false && this.currentTime > this.hurryTime){
            level?.events.emit(LevelTimer.EVENT_TIMER_OK);
            this.hurryEmitted = false;
        }
    }
}
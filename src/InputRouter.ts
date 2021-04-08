import type Entity from "./Entity";

export default class InputRouter {
    receivers: Set<Entity>;
    constructor() {
        this.receivers = new Set();
    }

    addReceiver(receiver:Entity){
        this.receivers.add(receiver);
    }

    dropReceiver(receiver:Entity){
        this.receivers.delete(receiver);
    }

    route(reouteInput:(a:Entity)=>void){
        for(const receiver of this.receivers){
            reouteInput(receiver);
        }
    }
}
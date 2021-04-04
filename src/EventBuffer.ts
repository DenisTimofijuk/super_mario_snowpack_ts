export default class EventBuffer {
    events: {name:Symbol, args:any[]}[];
    constructor() {
        this.events = [];
    }

    process(name:Symbol, callback:Function){
        this.events.forEach(event => {
            if(event.name === name){
                callback(...event.args);
            }
        })
    }

    emit(name:Symbol, ...args: any[]){
        const event = {name, args};
        this.events.push(event);
    }

    clear(){
        this.events.length = 0;
    }
}
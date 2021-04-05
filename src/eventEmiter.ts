export default class EventEmitter {
    listeners: {name:Symbol, callback:Function}[];
    constructor() {
        this.listeners = [];
    }

    listen(name:Symbol, callback:Function){
        const listener = {name, callback};
        this.listeners.push(listener);
    }

    emit(name:Symbol, ...args: any[]){
        this.listeners.forEach(listener => {
            if(listener.name === name){
                listener.callback(...args);
            }
        })
    }
}
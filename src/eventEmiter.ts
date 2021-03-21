export default class EventEmitter {
    listeners: {name:EventEmitterName, callback:Function}[];
    constructor() {
        this.listeners = [];
    }

    listen(name:EventEmitterName, callback:Function){
        const listener = {name, callback};
        this.listeners.push(listener);
    }

    emit(name:EventEmitterName, ...args: any[]){
        this.listeners.forEach(listener => {
            if(listener.name === name){
                listener.callback(...args);
            }
        })
    }
}
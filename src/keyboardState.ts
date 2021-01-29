
enum KeyState {RELEASED, PRESSED};

export default class KeyboardState {
    keyStates: Map<string, KeyState>;
    keyMap: Map<string, (a:KeyState)=>void>;
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code:string, callback:(a:KeyState)=>void){
        this.keyMap.set(code, callback);
    }

    handleEvent(event:KeyboardEvent){
        const {code} = event;

        if(!this.keyMap.has(code)){
            return;
        }

        event.preventDefault();
        const keyState = event.type === 'keydown' ? KeyState.PRESSED : KeyState.RELEASED;
        
        if(this.keyStates.get(code) === keyState){
            return;
        }

        this.keyStates.set(code, keyState);
        this.keyMap.has(code) && this.keyMap.get(code)!(keyState);
    }

    listenTo(window:Window){
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(<KeyboardEvent>event);
            })
        })
    }
}
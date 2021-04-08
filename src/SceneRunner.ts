import type { GameContext } from "src";
import type Level from "./level";

export default class SceneRunner {
    sceneIndex: number;
    scenes: Level[];
    constructor() {
        this.sceneIndex = -1;
        this.scenes = [];
    }

    addScene(scene:Level){
        this.scenes.push(scene);
    }

    runNext(){
        this.sceneIndex++;
    }

    update(gameContext:GameContext){
        const currentScene = this.scenes[this.sceneIndex];
        if(currentScene){
            currentScene.update(gameContext);
            currentScene.draw(gameContext);
        }
    }
}
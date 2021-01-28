import Compositor from "./Compositor"
import type Entity from "./Entity";
import { Matrix } from "./math";

export default class Level {
    comp: Compositor;
    entities: Set<Entity>;
    tiles: Matrix;
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
    }

    update(deltaTime:number){
        this.entities.forEach(entity => entity.update(deltaTime));
    }
}
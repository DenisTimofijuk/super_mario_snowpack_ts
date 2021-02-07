import Compositor from "./Compositor"
import type Entity from "./Entity";
import { Matrix } from "./math";
import TileCollider from "./TileCollider";

export default class Level {
    comp: Compositor;
    entities: Set<Entity>;
    tiles: Matrix;
    tileCollider: TileCollider;
    gravity: number;
    totalTime: number;
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }

    update(deltaTime:number){
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            this.tileCollider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.vel.y += this.gravity * deltaTime;
        });

        this.totalTime += deltaTime;
    }
}
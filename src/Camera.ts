import { Vec2 } from "./math";

export default class Camera {
    pos: Vec2;
    size: Vec2;
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(256, 224);
    }
}
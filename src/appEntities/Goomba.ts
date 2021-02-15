import Entity from "../Entity";
import type SpriteSheet from "../SpriteSheet";
import { loadSpriteSheet } from "../loaders";
import { PendulumWalk } from "../traits/PendulumWalk";

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory);
};

function createGoombaFactory(sprite:SpriteSheet) {
    const walkAnim = sprite.animation.get('walk');

    function drawGoomba(this:Entity, context:CanvasRenderingContext2D) {
        if(walkAnim !== undefined){
            sprite.draw(walkAnim(this.lifetime), context, 0, 0);
        }        
    }

    
    return function createGoomba() {
        const goomba = new Entity();
        goomba.size.set(16, 16);
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba.bind(goomba);

        return goomba;
    }
}
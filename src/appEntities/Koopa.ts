import Entity from "../Entity";
import type SpriteSheet from "../SpriteSheet";
import { loadSpriteSheet } from "../loaders";
import { PendulumWalk } from "../traits/PendulumWalk";

export function loadKoopa() {
    return loadSpriteSheet('koopa').then(createKoopaFactory);
};

function createKoopaFactory(sprite:SpriteSheet) {
    const walkAnim = sprite.animation.get('walk');

    function drawKoopa(this:Entity, context:CanvasRenderingContext2D) {
        if(walkAnim !== undefined){
            sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
        }        
    }

    
    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumWalk());
        koopa.draw = drawKoopa.bind(koopa);

        return koopa;
    }
}
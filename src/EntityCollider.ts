import type Entity from "./Entity";

export class EntityCollider {
    constructor(public entities:Set<Entity>) {
        
    }

    check(subject:Entity){
        this.entities.forEach(candidate => {
            if(subject === candidate){
                return;
            }

            if(subject.bounds.overlaps(candidate.bounds)){
                subject.collides(candidate);
            }
        })
    }
}
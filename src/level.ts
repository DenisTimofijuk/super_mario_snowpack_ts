import Compositor from './Compositor';
import type Entity from './Entity';
import { EntityCollider } from './EntityCollider';
import type { Matrix } from './math';
import TileCollider from './TileCollider';

export default class Level {
  comp: Compositor;
  entities: Set<Entity>;
  gravity: number;
  totalTime: number;
  tileCollider: TileCollider | null;
  entityCollider: EntityCollider;
  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = null;
  }

  setCollisionGrid(matrix: Matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    if (this.tileCollider === null) {
      return;
    }

    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);
      
      entity.pos.x += entity.vel.x * deltaTime;
      if(entity.canCollide){
        this.tileCollider!.checkX(entity);
      }      
      entity.pos.y += entity.vel.y * deltaTime;
      if(entity.canCollide){
        this.tileCollider!.checkY(entity);
      }    

      entity.vel.y += this.gravity * deltaTime;
    });

    this.entities.forEach((entity) => {
      if(entity.canCollide){
        this.entityCollider.check(entity);
      }      
    })

    this.entities.forEach(entity => entity.finalize())

    this.totalTime += deltaTime;
  }
}

import type { GameContext } from './index';
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
  tileCollider: TileCollider;
  entityCollider: EntityCollider;
  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = new TileCollider();
  }

  update(gameContext: GameContext) {
    if (this.tileCollider === null) {
      return;
    }

    this.entities.forEach((entity) => {
      entity.update(gameContext, this);
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    })

    this.entities.forEach(entity => entity.finalize())

    this.totalTime += gameContext.deltaTime!;
  }
}

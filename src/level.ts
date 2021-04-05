import type { GameContext } from './index';
import Compositor from './Compositor';
import type Entity from './Entity';
import { EntityCollider } from './EntityCollider';
import TileCollider from './TileCollider';
import MusicController from './MusicController';
import EventEmitter from './eventEmiter';

export default class Level {
  comp: Compositor;
  entities: Set<Entity>;
  gravity: number;
  totalTime: number;
  tileCollider: TileCollider;
  entityCollider: EntityCollider;
  music: MusicController;
  events: EventEmitter;
  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = new TileCollider();
    this.music = new MusicController();
    this.events = new EventEmitter();
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

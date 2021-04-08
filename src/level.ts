import type { GameContext } from './index';
import Compositor from './Compositor';
import type Entity from './Entity';
import { EntityCollider } from './EntityCollider';
import TileCollider from './TileCollider';
import MusicController from './MusicController';
import EventEmitter from './eventEmiter';
import Camera from './Camera';
import { findPlayers } from './player';


function focusPlayer(level:Level) {
  for(const player of findPlayers(level)){
    level.camera.pos.x = Math.max(0, player.pos.x - 100);
  }
}

export default class Level {
  comp: Compositor;
  entities: Set<Entity>;
  gravity: number;
  totalTime: number;
  tileCollider: TileCollider;
  entityCollider: EntityCollider;
  music: MusicController;
  events: EventEmitter;
  camera: Camera;
  name: string;
  constructor() {
    this.name = "";
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities)
    this.tileCollider = new TileCollider();
    this.music = new MusicController();
    this.events = new EventEmitter();
    this.camera = new Camera();
  }

  draw(gameContext: GameContext){
    this.comp.draw(gameContext.videoContext, this.camera);
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

    focusPlayer(this);

    this.totalTime += gameContext.deltaTime!;
  }
}

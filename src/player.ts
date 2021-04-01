import Entity from './Entity';
import type Level from './level';
import { Player } from './traits/player';
import { PlayerController } from './traits/PlayerController';
import { Solid } from './traits/Solid';

export function createPlayerENviroment(playerEntity: Entity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(new Solid());
  playerEnv.addTrait(playerControl);

  return playerEnv;
}

export function createPlayer(entity:Entity) {
  entity.addTrait(new Player());
  return entity;
}

export function* findPlayers(level?: Level) {
  if (!level) {
    return [];
  }

  for (const entity of level.entities) {
    if (entity.player) {
      yield entity;
    }
  }
}

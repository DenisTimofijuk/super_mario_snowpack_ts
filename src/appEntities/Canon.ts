import Entity from '../Entity';
import { loadAudioBoard } from '../vaLoaders/audio';
import type AudioBoard from '../AudioBoard';
import { Emitter } from '../traits/Emitter';
import type Level from '../level';
import type { EntityFactorie } from '../entities';
import { findPlayers } from '../player';

const HOLD_FIRE_THRESHOLD = 30;

export function loadCanon(
  audioContext: AudioContext,
  entityFactories: EntityFactorie,
) {
  return loadAudioBoard('bullet', audioContext).then((audio) => {
    return createCanonFactory(audio, entityFactories);
  });
}

function createCanonFactory(
  audio: AudioBoard,
  entityFactories: EntityFactorie,
) {
  function emitBullet(cannon: Entity, level?: Level) {
    let dir = 1;
    for (const player of findPlayers(level)) {
      if (
        player.pos.x > cannon.pos.x - HOLD_FIRE_THRESHOLD &&
        player.pos.x < cannon.pos.x + HOLD_FIRE_THRESHOLD
      ) {
        return;
      }

      if(player.pos.x < cannon.pos.x){
        dir = -1;
      }
    }

    const bullet = entityFactories.bullet();
    bullet.pos.copy(cannon.pos);
    bullet.vel.set(80 * dir, 0);

    cannon.sounds.add('shoot');
    level?.entities.add(bullet);
  }

  return function createCanon() {
    const canon = new Entity();
    canon.audio = audio;

    const emitter = new Emitter();
    emitter.interval = 4;
    emitter.emitters.push(emitBullet);

    canon.addTrait(emitter);

    return canon;
  };
}

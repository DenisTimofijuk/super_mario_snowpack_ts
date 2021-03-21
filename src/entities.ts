import { loadGoomba } from "./appEntities/Goomba";
import { loadKoopa } from "./appEntities/Koopa";
import { loadMario } from "./appEntities/mario";
import type Entity from "./Entity";

export type EntityFactorie = {
  [key in EntityName]: () => Entity
}

export function loadEntities(audioContext: AudioContext) {
  const entityFactories:EntityFactorie = <any>{};

  function addAs(name:EntityName) {
    return (factory: () => Entity) => entityFactories[name] = factory
  }

  return Promise.all([
    loadMario(audioContext).then(addAs('mario')),
    loadGoomba(audioContext).then(addAs('goomba')), 
    loadKoopa(audioContext).then(addAs('koopa')),
  ]).then(() => entityFactories);  
}
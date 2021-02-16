import { loadGoomba } from "./appEntities/Goomba";
import { loadKoopa } from "./appEntities/Koopa";
import { loadMario } from "./appEntities/mario";
import type Entity from "./Entity";

export function loadEntities() {
  const entityFactories:EntityFactorie = <any>{};

  function addAs(name:EntityName) {
    return (factory: () => Entity) => entityFactories[name] = factory
  }

  return Promise.all([
    loadMario().then(addAs('mario')),
    loadGoomba().then(addAs('goomba')), 
    loadKoopa().then(addAs('koopa')),
  ]).then(() => entityFactories);  
}
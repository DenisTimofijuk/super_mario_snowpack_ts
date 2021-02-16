import Entity, { displayMissingTrait } from './Entity';
import KeyboardState from './keyboardState';

export function setupKeyboard(mario: Entity) {
  const input = new KeyboardState();
  input.addMapping('ArrowUp', (keystate) => {
    if (keystate) {
      if(mario.jump){
        mario.jump.start()
      }else{
        displayMissingTrait('mario jump.start', 'jump');
      }       
    } else {
      if(mario.jump){
        mario.jump.cancel()
      }else{
        displayMissingTrait('mario jum.cancel', 'jump');
      }
    }
  });

  input.addMapping('ArrowRight', (keystate) => {
    if(mario.go){
      mario.go.dir += keystate ? 1 : -1
    }else{
      displayMissingTrait('mario', 'go');
    }
  });

  input.addMapping('ArrowLeft', (keystate) => {
    if(mario.go){
      mario.go.dir += keystate ? -1 : 1
    }else{
      displayMissingTrait('mario', 'go');
    }
  });

  input.addMapping('ShiftLeft', (keystate) => {
    mario.turbo(keystate)
  });

  return input;
}

import type Entity from './Entity';
import KeyboardState from './keyboardState';

export function setupKeyboard(entity: Entity) {
  const input = new KeyboardState();
  input.addMapping('Space', (keystate) => {
    if (keystate) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  input.addMapping('ArrowRight', (keystate) => {
    entity.go.dir = keystate;
  });

  input.addMapping('ArrowLeft', (keystate) => {
    entity.go.dir = -keystate;
  });

  return input;
}

import type Entity from './Entity';
import KeyboardState from './keyboardState';

export function setupKeyboard(mario: Entity) {
  const input = new KeyboardState();
  input.addMapping('ArrowUp', (keystate) => {
    if (keystate) {
      mario.jump.start();
    } else {
      mario.jump.cancel();
    }
  });

  input.addMapping('ArrowRight', (keystate) => {
    mario.go.dir += keystate ? 1 : -1;
  });

  input.addMapping('ArrowLeft', (keystate) => {
    mario.go.dir += keystate ? -1 : 1;
  });

  input.addMapping('ShiftLeft', (keystate) => {
    mario.turbo(keystate)
  });

  return input;
}

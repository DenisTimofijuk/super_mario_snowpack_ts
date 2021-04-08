import Entity, { displayMissingTrait } from './Entity';
import InputRouter from './InputRouter';
import KeyboardState from './keyboardState';

export function setupKeyboard(window: Window) {
  const input = new KeyboardState();
  const router = new InputRouter();
  input.listenTo(window);

  input.addMapping('ArrowUp', (keystate) => {
    if (keystate) {
      router.route(entity => entity.jump?.start());
    } else {
      router.route(entity => entity.jump?.cancel());
    }
  });

  input.addMapping('ArrowRight', (keystate) => {
      router.route(entity => entity.go && (entity.go.dir += keystate ? 1 : -1));
  });

  input.addMapping('ArrowLeft', (keystate) => {
      router.route(entity => entity.go && (entity.go.dir += keystate ? -1 : 1));
  });

  input.addMapping('ShiftLeft', (keystate) => {
    router.route(entity => entity.turbo(keystate));
  });

  return router;
}

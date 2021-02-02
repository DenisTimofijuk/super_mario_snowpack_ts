import type Camera from './Camera';
import type Entity from './Entity';

export function setupMouseControl(
  canvas: HTMLCanvasElement,
  entity: Entity,
  camera: Camera,
) {
  let lastEvent: MouseEvent;

  ['mousedown', 'mousemove'].forEach((eventName) => {
    canvas.addEventListener(eventName, (e) => {
      let event = e as MouseEvent;
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(
          event.offsetX + camera.pos.x,
          event.offsetY + camera.pos.y,
        );
      } else if (
        event.buttons === 2 &&
        lastEvent &&
        lastEvent.buttons === 2 &&
        lastEvent.type === 'mousemove'
      ) {
        camera.pos.x -= event.offsetX - lastEvent.offsetX;
      }

      lastEvent = event;
    });
  });

  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

// currently we don't use it

import type Camera from "src/Camera";

export function createCameraLayer(cameraToDraw:Camera) {
    return function drawCameraRect(context:CanvasRenderingContext2D, fromCamera:Camera) {
      context.strokeStyle  = 'purple';
      context.rect(
        cameraToDraw.pos.x - fromCamera.pos.x,
        cameraToDraw.pos.y - fromCamera.pos.y,
        cameraToDraw.size.x,
        cameraToDraw.size.y
        );
      context.stroke();
    }
  }
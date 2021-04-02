import Entity, { Sides } from "../Entity";
import type { HandleIncome } from "./brick";

function handleY({entity, match}:HandleIncome) {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Sides.BOTTOM, match);
    }
  } else if (entity.vel.y < 0) {
    if (entity.bounds.top < match.y2) {
      entity.obstruct(Sides.TOP, match);
    }
  }
}

function handleX({entity, match}:HandleIncome) {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(Sides.RIGHT, match);
    }
  } else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(Sides.LEFT, match);
    }
  }
}

export const ground = [handleY, handleX];
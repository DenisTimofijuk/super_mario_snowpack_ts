import { createBackgroundLayer, createSpriteLayer } from './layers';
import Level from './level';
import { loadBackgroundSprites } from './sprites';
import type { SpriteSheetName } from './SpriteSheet';

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export type Tyle_JSON = {
  tile: SpriteSheetName;
  ranges: [[number, number, number, number]];
};

type Level_JSON = {
  backgrounds: Tyle_JSON[];
};

type LevelName = '1-1';

export function loadLevel(name: LevelName) {
  return Promise.all([
    fetch(`./levels/${name}.json`).then((r) => r.json() as any as Level_JSON),
    loadBackgroundSprites(),
  ]).then(([levelSpec, backgroundsprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(
      level,
      backgroundsprites,
    );
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}

function createTiles(level: Level, backgrounds: Tyle_JSON[]) {
  backgrounds.forEach(background =>
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: background.tile,
          })
        }
      }
    }),
  );
}

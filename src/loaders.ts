import { createBackgroundLayer, createSpriteLayer } from './layers';
import Level from './level';
import SpriteSheet from './SpriteSheet';

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadLevel(name: LevelName) {
  return loadJSON<Level_JSON>(`./levels/${name}.json`)
    .then((levelSpec) =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)]),
    )
    .then(([levelSpec, backgroundsprites]) => {
      const level = new Level();

      createTiles(level, levelSpec.backgrounds);

      if (backgroundsprites) {
        const backgroundLayer = createBackgroundLayer(level, backgroundsprites);
        level.comp.layers.push(backgroundLayer);
      }

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}

function createTiles(level: Level, backgrounds: Tyle_JSON[]) {
  function applyRange(
    background: Tyle_JSON,
    xStart: number,
    xLen: number,
    yStart: number,
    yLen: number,
  ) {
    const xENd = xStart + xLen;
    const yENd = yStart + yLen;
    for (let x = xStart; x < xENd; ++x) {
      for (let y = yStart; y < yENd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        });
      }
    }
  }

  backgrounds.forEach((background) =>
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range as [
          number,
          number,
          number,
          number,
        ];
        applyRange(background, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range as [number, number, number];
        applyRange(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1);
      }
    }),
  );
}

export async function loadSpriteSheet(name: Sprite_JSON_file_name) {
  const sheetSpec = await loadJSON<Overworld_JSON | Underworld_JSON | Mario_JSON>(
    `./sprites/${name}.json`,
  );
  const image = await loadImage(sheetSpec.imageURL);
  let sprites:SpriteSheet;

  if(sheetSpec.type === 'world'){
    sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);  
    sheetSpec.tiles.forEach((tileSpec) => {
      sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
    });
  }else{
    sprites = new SpriteSheet(image, 0, 0);
    sheetSpec.frames.forEach((frameSpec) => {
      sprites.define(frameSpec.name, ...frameSpec.rect)
    });
  }
  
  return sprites;
}

async function loadJSON<T extends JSON_object>(url: string): Promise<T> {
  const r = await fetch(url);
  return await r.json();
}

import { createBackgroundLayer, createSpriteLayer } from './layers';
import Level from './level';
import type { BackgroundSpriteName, SpriteSheetName } from './SpriteSheet';
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
  return Promise.all([
    loadJSON(`./levels/${name}.json`),
    loadSpriteSheet('overworld')
  ]).then(([levelSpec, backgroundsprites]) => {
    const level = new Level();

    if (levelSpec.type === 'level') {
      createTiles(level, levelSpec.backgrounds);
    }

    if(backgroundsprites){
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

type SpriteName = 'overworld' | 'underworld';

type Overworld_tyles = {
  name: BackgroundSpriteName;
  index: [number, number];
};

interface Worlds {
  imageURL: string;
  tileW: number;
  tileH: number;
  tiles: Overworld_tyles[];
}
interface Overworld_JSON extends Worlds {
  type: 'overworld';
}

interface Underworld_JSON extends Worlds {
  type: 'underworld';
}

export type Tyle_JSON = {
  tile: SpriteSheetName;
  ranges: [[number, number, number?, number?]];
};

type Level_JSON = {
  type: 'level';
  backgrounds: Tyle_JSON[];
};

type LevelName = '1-1';

type FetchedJSON = Level_JSON | Overworld_JSON | Underworld_JSON;

async function loadSpriteSheet(name: SpriteName) {
  const sheetSpec = await loadJSON(`./sprites/${name}.json`);
  if (sheetSpec.type !== 'overworld' && sheetSpec.type !== 'underworld') {
    return;
  }
  const image = await loadImage(sheetSpec.imageURL);
  const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
  sheetSpec.tiles.forEach(tileSpec => {
    sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);  
  });
  return sprites;
}

async function loadJSON(url: string): Promise<FetchedJSON> {
  const r = await fetch(url);
  return await r.json();
}

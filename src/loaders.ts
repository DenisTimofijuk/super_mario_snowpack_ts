import { createAnim } from './anim';
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

export function loadLevel(name: Level_JSON_file_name) {
  return loadJSON<Level_JSON>(`./levels/${name}.json`)
    .then((levelSpec) =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)]),
    )
    .then(([levelSpec, backgroundsprites]) => {
      const level = new Level();

      createTiles(level, levelSpec.backgrounds, levelSpec.patterns);

      if (backgroundsprites) {
        const backgroundLayer = createBackgroundLayer(level, backgroundsprites);
        level.comp.layers.push(backgroundLayer);
      }

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}

function createTiles(level: Level, backgrounds: (BackgroundTyle | BackgroundPattern | PatternBackground)[], patterns:LevelPatterns, offsetX = 0, offsetY = 0) {
  function applyRange(
    background: (BackgroundTyle | BackgroundPattern | PatternBackground),
    xStart: number,
    xLen: number,
    yStart: number,
    yLen: number,
  ) {
    const xENd = xStart + xLen;
    const yENd = yStart + yLen;
    for (let x = xStart; x < xENd; ++x) {
      for (let y = yStart; y < yENd; ++y) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;
        if( 'pattern' in  background ){
          const backgrounds = patterns[background.pattern].backgrounds;
          createTiles(level, backgrounds, patterns, derivedX, derivedY);
        }else {
          let type;
          if('type' in background){
            type = background.type;
          }
          level.tiles.set(derivedX, derivedY, {
            name: background.tile,
            type: type,
          });
        }        
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

  let tileW = 0;
  if('tileW' in sheetSpec){
    tileW = sheetSpec.tileW;
  }
  let tileH = 0;
  if('tileH' in sheetSpec){
    tileH = sheetSpec.tileH;
  }

  const sprites = new SpriteSheet(image, tileW, tileH); 

  if(sheetSpec.type === 'world' && sheetSpec.tiles){
    sheetSpec.tiles.forEach((tileSpec) => {
      sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
    });
  }

  if(sheetSpec.type === 'entity' && sheetSpec.frames){
    sheetSpec.frames.forEach((frameSpec) => {
      sprites.define(frameSpec.name, ...frameSpec.rect)
    });
  }

  if(sheetSpec.type === 'world' && sheetSpec.animations){
    sheetSpec.animations.forEach((animSpec) => {
      const animation = createAnim(animSpec.frames, animSpec.frameLen);
      sprites.defineAnim(animSpec.name, animation);
    });
  }
  
  return sprites;
}

async function loadJSON<T extends JSON_object>(url: string): Promise<T> {
  const r = await fetch(url);
  return await r.json();
}

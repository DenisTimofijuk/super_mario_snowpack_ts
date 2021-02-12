import { createAnim } from './anim';
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

export async function loadJSON<T extends JSON_object>(url: string): Promise<T> {
  const r = await fetch(url);
  return await r.json();
}

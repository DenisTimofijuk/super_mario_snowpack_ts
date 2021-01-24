import type { SpriteSheetName } from "./SpriteSheet";

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
  ranges: [
      [
          number, number,
          number, number
      ]
  ]
}

type Level_JSON = {
  backgrounds:Tyle_JSON[]
}

type LevelName = '1-1';

export function loadLevel(name:LevelName):Promise<Level_JSON> {
  return fetch(`./levels/${name}.json`).then(r => r.json());
}
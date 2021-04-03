import { createAnim } from "../anim";
import { loadJSON, loadImage } from "../loaders";
import SpriteSheet from "../SpriteSheet";

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
  
    if("tiles" in sheetSpec){
      sheetSpec.tiles.forEach((tileSpec) => {
        sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
      });
    }
  
    if("frames" in sheetSpec){
      sheetSpec.frames.forEach((frameSpec) => {
        sprites.define(frameSpec.name, ...frameSpec.rect)
      });
    }
  
    if("animations" in sheetSpec){
      sheetSpec.animations.forEach((animSpec) => {
        const animation = createAnim(animSpec.frames, animSpec.frameLen);
        sprites.defineAnim(animSpec.name, animation);
      });
    }
    
    return sprites;
  }
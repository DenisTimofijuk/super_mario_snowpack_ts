type LevelName = '1-1';
type SpriteName = 'overworld' | 'underworld';
type MarioSpritename = 'idle';
type TyileType = 'ground' | 'sky';
type BackgroundSpriteName = TyileType | 'chocolate' | 'bricks' | 'chance';
type SpriteSheetName = BackgroundSpriteName | MarioSpritename;
type TraitName = 'jump' | 'velocity' | 'go';

type Tyle_JSON = {
  tile: SpriteSheetName;
  type: TyileType;
  ranges: [[number, number, number?, number?]];
};

type Level_JSON = {
  spriteSheet: SpriteName;
  backgrounds: Tyle_JSON[];
};

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

type JSON_object = Level_JSON | Worlds;

interface Overworld_JSON extends Worlds {}
interface Underworld_JSON extends Worlds {}

type LevelName = '1-1';
type Sprite_JSON_file_name = 'overworld' | 'underworld' | 'mario';
type MarioSpritename = 'idle';
type TyileType = 'ground' | 'sky';
type MarioFrameName = "idle" | "run-1"  | "run-2" | "run-3";
type BackgroundSpriteName = TyileType | 'chocolate' | 'bricks' | 'chance';
type SpriteSheetName = BackgroundSpriteName | MarioSpritename | MarioFrameName;
type TraitName = 'jump' | 'go';

type Tyle_JSON = {
  tile: SpriteSheetName;
  type: TyileType;
  ranges: [[number, number, number?, number?]];
};

type Level_JSON = {
  spriteSheet: Sprite_JSON_file_name;
  backgrounds: Tyle_JSON[];
};

type Overworld_tyles = {
  name: BackgroundSpriteName;
  index: [number, number];
};

interface Worlds_JSON {
  type: 'world';
  imageURL: string;
  tileW: number;
  tileH: number;
  tiles: Overworld_tyles[];
}


interface EntityFrame {
  name: MarioFrameName;
  rect: [number, number, number, number];
}

interface Entity_JSON {
  type: 'entity';
  imageURL: string;
  frames: EntityFrame[];
}

type JSON_object = Level_JSON | Worlds_JSON | Entity_JSON;

interface Overworld_JSON extends Worlds_JSON {}
interface Underworld_JSON extends Worlds_JSON {}
interface Mario_JSON extends Entity_JSON {}

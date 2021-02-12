type Level_JSON_file_name = '1-1';
type Sprite_JSON_file_name = 'overworld' | 'underworld' | 'mario';
type TyleType = 'ground' | 'sky';

type MarioFrameName = "idle" | "run-1"  | "run-2" | "run-3" | "break" | "jump";

type CloudSprites = "cloud-1-1" | "cloud-1-2" | "cloud-1-3" | "cloud-2-1" | "cloud-2-2" | "cloud-2-3";

type PypeSprites = "pipe-insert-vert-left" | "pipe-insert-vert-right" | "pipe-vert-left" | "pipe-vert-right";
type PatternPipeKeys = 'pipe-section-vert' | 'pipe-cap-vert' | 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'cloud-single';

type ChanceSprites = 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
type BackgroundSprites = 'ground' | 'sky' | 'chocolate' | 'bricks';

type BackgroundSpriteName = BackgroundSprites | CloudSprites | PypeSprites | ChanceSprites;
type SpriteSheetName = BackgroundSpriteName | MarioFrameName;

type TraitName = 'jump' | 'go';

type BackgroundTile = {
  name: SpriteSheetName;
  type?: TyleType;
  ranges: [[number, number, number?, number?]];
};

type BackgroundPattern = {
  pattern: PatternPipeKeys;
  ranges: Array<[number, number]>;
}

type PatternBackground = {
  name: PypeSprites | CloudSprites;
  type?: TyleType,
  ranges: Array<[number, number]>;
} 

type LevelPatterns = {
  [key in PatternPipeKeys]: {
    tiles: Array<PatternBackground | BackgroundPattern>
  }
}

type Level_JSON = {
  spriteSheet: Sprite_JSON_file_name;
  layers:[{
    tiles: (BackgroundTile & BackgroundPattern)[];
  }];  
  patterns: LevelPatterns;
};

type World_tyles = {
  name: SpriteSheetName;
  index: [number, number];
};

interface WorldAnimation {
  name: SpriteSheetName;
  frameLen:number;
  frames: BackgroundSpriteName[];
}
interface Worlds_JSON {
  type: 'world';
  imageURL: string;
  tileW: number;
  tileH: number;
  tiles: World_tyles[];
  animations: WorldAnimation[];
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

interface Overworld_JSON extends Worlds_JSON {}
interface Underworld_JSON extends Worlds_JSON {}
interface Mario_JSON extends Entity_JSON {}

type JSON_object = Level_JSON | Overworld_JSON | Underworld_JSON | Mario_JSON;
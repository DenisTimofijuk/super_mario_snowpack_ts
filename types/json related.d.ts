type EntityName = 'mario' | 'koopa' | 'goomba' | 'bullet' | 'cannon';

type Level_JSON_file_name = '1-1';
type Sprite_JSON_file_name = 'overworld' | 'underworld' | EntityName | 'bullet-bill';
type TyleType = 'ground' | 'sky';

type MarioFrameName = "idle" | "run" | "run-1"  | "run-2" | "run-3" | "break" | "jump";
type EnemiesFrameName = "flat" | "walk" | "walk-1" | "walk-2" | "hiding" | "hiding-with-legs" | "wake";

type CloudSprites = "cloud-1-1" | "cloud-1-2" | "cloud-1-3" | "cloud-2-1" | "cloud-2-2" | "cloud-2-3";

type Cannon = 'cannon-1' | 'cannon-2' | 'cannon-3' | 'bullet';

type PypeSprites = "pipe-insert-vert-left" | "pipe-insert-vert-right" | "pipe-vert-left" | "pipe-vert-right";
type PatternPipeKeys = 'pipe-section-vert' | 'pipe-cap-vert' | 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'cloud-single' | 'cannon-2h';

type ChanceSprites = 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
type BackgroundSprites = 'ground' | 'sky' | 'chocolate' | 'bricks';

type FontName = '!'|'"'|'#'|'$'|'%'|'&'|'\''|'('|')'|'*'|'+'|','|'-'|'.'|'/'|'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|':'|';'|'<'|'='|'>'|'?'|'@'|'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z'|'['|'\\'|']'|'^'|'_'|'`'|'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z'|'{'|'|'|'}'|'~';

type BackgroundSpriteName = BackgroundSprites | CloudSprites | PypeSprites | ChanceSprites | Cannon;
type SpriteSheetName = BackgroundSpriteName | MarioFrameName | EnemiesFrameName | FontName;

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

type Level_entities = {
  name: EntityName;
  pos: [number, number];
}

type Level_JSON = {
  spriteSheet: Sprite_JSON_file_name;
  layers:[{
    tiles: (BackgroundTile & BackgroundPattern)[];
  }];  
  patterns: LevelPatterns;
  entities: Level_entities[];
};

type World_tyles = {
  name: SpriteSheetName;
  index: [number, number];
};

interface SpriteSheetAnimation {
  name: SpriteSheetName;
  frameLen:number;
  frames: (BackgroundSpriteName | MarioFrameName | EnemiesFrameName)[];
}
interface Worlds_JSON {
  imageURL: string;
  tileW: number;
  tileH: number;
  tiles: World_tyles[];
  animations: SpriteSheetAnimation[];
}

interface EntityFrame {
  name: MarioFrameName;
  rect: [number, number, number, number];
}

interface Entity_JSON {
  imageURL: string;
  frames: EntityFrame[];
  animations: SpriteSheetAnimation[];
}

interface Overworld_JSON extends Worlds_JSON {}
interface Underworld_JSON extends Worlds_JSON {}
interface Mario_JSON extends Entity_JSON {}
interface Goomba_JSON extends Entity_JSON {}
interface Koopa_JSON extends Entity_JSON {}

type JSON_object = Level_JSON | Overworld_JSON | Underworld_JSON | Mario_JSON | Goomba_JSON | Koopa_JSON | MarioSoundsJSON;


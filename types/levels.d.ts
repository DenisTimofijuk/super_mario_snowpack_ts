type Level_JSON_file_name = '1-1' | '1-2' | 'debug-coin';
type Pattern_JSON_file_name = 'overworld-patterns';

type BackgroundTile = {
  name: SpriteSheetName;
  type?: TyleType;
  ranges: [[number, number, number?, number?]];
};

type BackgroundPattern = {
  pattern: PatternPipeKeys;
  ranges: Array<[number, number]>;
};

type PatternBackground = {
  name: PypeSprites | CloudSprites;
  type?: TyleType;
  ranges: Array<[number, number]>;
};

type Level_entities = {
  name: EntityName;
  pos: [number, number];
};

interface Level_JSON {
  spriteSheet: Sprite_JSON_file_name;
  musicSheet: MusicJSONfileName;
  patternSheet: Pattern_JSON_file_name;
  layers: [
    {
      tiles: (BackgroundTile & BackgroundPattern)[];
    },
  ];
  entities: Level_entities[];
}

interface Level_1_1 extends Level_JSON {}
interface Level_1_2 extends Level_JSON {}

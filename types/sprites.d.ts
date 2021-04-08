interface SpriteSheetAnimation {
  name: SpriteSheetName;
  frameLen:number;
  frames: (BackgroundSpriteName | MarioFrameName | EnemiesFrameName)[];
}

type World_tyles = {
  name: SpriteSheetName;
  index: [number, number];
};

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

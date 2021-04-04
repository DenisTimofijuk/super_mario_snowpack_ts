type GridElement = BackgroundTile | BackgroundPattern | PatternBackground;

type GetByIndexResult = {
  tile: GridElement;
  index_x:number;
  index_y:number;
  y1: number;
  y2: number;
  x1: number;
  x2: number;
};

type EventEmitterName = 'stomp' | 'jump';

type TraitName = 'jump' | 'go' | 'pendulummoove' | 'behavior' | 'stomper' | 'killable' | 'playercontroller' | 'solid' | 'physics' | 'velocity' | 'gravity' | 'emitter' | 'player';
type GridElement = {
  name?: SpriteSheetName;
  type?: TyleType | undefined;
};

type GetByIndexResult = {
  tile: GridElement;
  y1: number;
  y2: number;
  x1: number;
  x2: number;
};

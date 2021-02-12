import { Matrix } from '../math';
import { createBackgroundLayer, createSpriteLayer } from '../layers';
import Level from '../level';
import { loadJSON, loadSpriteSheet } from '../loaders';

export function loadLevel(name: Level_JSON_file_name) {
  console.log('load level');

  return loadJSON<Level_JSON>(`./levels/${name}.json`)
    .then((levelSpec) =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)]),
    )
    .then(([levelSpec, backgroundsprites]) => {
      const level = new Level();
      
      const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
      }, <(BackgroundTile & BackgroundPattern)[]>[]);

      const collisionGrid = createCollisionGrid(
        mergedTiles,
        levelSpec.patterns,
      );
      level.setCollisionGrid(collisionGrid);

      levelSpec.layers.forEach((layer) => {
        const backgroundGrid = createBackgroundGrid(
          layer.tiles,
          levelSpec.patterns,
        );
        if (backgroundsprites) {
          const backgroundLayer = createBackgroundLayer(
            level,
            backgroundGrid,
            backgroundsprites,
          );
          level.comp.layers.push(backgroundLayer);
        }
      });

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}

function createCollisionGrid(
  tiles: (BackgroundTile & BackgroundPattern)[],
  patterns: LevelPatterns,
) {
  const grid = new Matrix();
  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { type: tile.type });
  }

  return grid;
}

function createBackgroundGrid(
  tiles: (BackgroundTile & BackgroundPattern)[],
  patterns: LevelPatterns,
) {
  const grid = new Matrix();
  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, { name: tile.name });
  }

  return grid;
}

function* expandSpan(
  xStart: number,
  xLen: number,
  yStart: number,
  yLen: number,
) {
  const xENd = xStart + xLen;
  const yENd = yStart + yLen;
  for (let x = xStart; x < xENd; ++x) {
    for (let y = yStart; y < yENd; ++y) {
      yield { x, y };
    }
  }
}

function expandSpanRange(
  range: [number, number, (number | undefined)?, (number | undefined)?],
) {
  if (range.length === 4) {
    const [xStart, xLen, yStart, yLen] = range as [
      number,
      number,
      number,
      number,
    ];
    return expandSpan(xStart, xLen, yStart, yLen);
  } else if (range.length === 3) {
    const [xStart, xLen, yStart] = range as [number, number, number];
    return expandSpan(xStart, xLen, yStart, 1);
  } else {
    //if (range.length === 2)
    const [xStart, yStart] = range;
    return expandSpan(xStart, 1, yStart, 1);
  }
}

function* expandRanges(
  ranges: [number, number, (number | undefined)?, (number | undefined)?][],
) {
  for (const range of ranges) {
    for (const item of expandSpanRange(range)) {
      yield item;
    }
  }
}

function expandTiles(
  tiles: (BackgroundTile | BackgroundPattern | PatternBackground)[],
  patterns: LevelPatterns,
) {
  const expandedTiles: {
    tile: BackgroundTile | PatternBackground;
    x: number;
    y: number;
  }[] = [];

  function walkTiles(
    tiles: (BackgroundTile | BackgroundPattern | PatternBackground)[],
    offsetX: number,
    offsetY: number,
  ) {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;
        if ('pattern' in tile) {
          const tiles = patterns[tile.pattern].tiles;
          walkTiles(tiles, derivedX, derivedY);
        } else {
          expandedTiles.push({
            tile,
            x: derivedX,
            y: derivedY,
          });
        }
      }
    }
  }

  walkTiles(tiles, 0, 0);

  return expandedTiles;
}

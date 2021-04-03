import { Matrix } from '../math';
import Level from '../level';
import { loadJSON } from '../loaders';
import type SpriteSheet from '../SpriteSheet';
import type { EntityFactorie } from '../entities';
import { createBackgroundLayer } from '../app_layers/background';
import { createSpriteLayer } from '../app_layers/sprites';
import { loadMusicSheet } from './music';
import { loadSpriteSheet } from './sprite';

function setupBackground(
  levelSpec: Level_JSON,
  level: Level,
  backgroundsprites: SpriteSheet,
) {
  levelSpec.layers.forEach((layer) => {
    const grid = createGrid(
      layer.tiles,
      levelSpec.patterns,
    );
    if (backgroundsprites) {
      const backgroundLayer = createBackgroundLayer(
        level,
        grid,
        backgroundsprites,
      );
      level.comp.layers.push(backgroundLayer);
      level.tileCollider.addGrid(grid);
    }
  });
}

function setupEntities(
  levelSpec: Level_JSON,
  level: Level,
  entityFactory: EntityFactorie,
) {
  
  levelSpec.entities.forEach( ({name, pos:[x, y]}) => {
    const createEntity = entityFactory[name];
    const entity = createEntity();
    entity.pos.set(x, y);
    level.entities.add(entity);
  })

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

export function createLevelLoader(entityFactory: EntityFactorie) {
  return function loadLevel(name: Level_JSON_file_name) {
    return loadJSON<Level_JSON>(`./levels/${name}.json`)
      .then((levelSpec) =>
        Promise.all([
          levelSpec, 
          loadSpriteSheet(levelSpec.spriteSheet),
          loadMusicSheet(levelSpec.musicSheet)
        ]),
      )
      .then(([levelSpec, backgroundsprites, musicPlayer]) => {
        const level = new Level();
        level.music.setPlayer(musicPlayer);
        setupBackground(levelSpec, level, backgroundsprites);
        setupEntities(levelSpec, level, entityFactory);

        return level;
      });
  };
}

function createGrid(
  tiles: (BackgroundTile & BackgroundPattern)[],
  patterns: LevelPatterns,
) {
  const grid = new Matrix();
  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, tile);
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
    yield* expandSpanRange(range);
  }
}

function* expandTiles(
  tiles: (BackgroundTile | BackgroundPattern | PatternBackground)[],
  patterns: LevelPatterns,
) {
  function* walkTiles(
    tiles: (BackgroundTile | BackgroundPattern | PatternBackground)[],
    offsetX: number,
    offsetY: number,
  ): Generator<
    {
      tile: BackgroundTile | BackgroundPattern | PatternBackground;
      x: number;
      y: number;
    },
    void,
    unknown
  > {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;
        if ('pattern' in tile) {
          const tiles = patterns[tile.pattern].tiles;
          yield* walkTiles(tiles, derivedX, derivedY);
        } else {
          yield {
            tile,
            x: derivedX,
            y: derivedY,
          };
        }
      }
    }
  }

  yield* walkTiles(tiles, 0, 0);
}

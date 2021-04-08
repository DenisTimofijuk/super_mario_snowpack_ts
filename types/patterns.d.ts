type LevelPatterns = {
  [key in PatternPipeKeys]: {
    tiles: Array<PatternBackground | BackgroundPattern>;
  };
};

interface OverworldPattern extends LevelPatterns {}

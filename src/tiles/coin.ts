import type { HandleIncome } from './brick';

function handle({ entity, match, resolver }: HandleIncome) {
  if (entity.player) {
    entity.player.addCoins(1);
    const grid = resolver.matrix;
    grid.delete(match.index_x, match.index_y);
  }
}

export const coin = [handle, handle];

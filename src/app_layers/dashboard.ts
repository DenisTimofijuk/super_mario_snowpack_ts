import type Level from '../level';
import { findPlayers } from '../player';
import type { Font } from '../vaLoaders/font';

function getPlayerTrait(level: Level) {
  for (const entity of findPlayers(level)) {
    return entity.player;
  }
}

function getTimerTrait(level: Level) {
  for (const entity of level.entities) {
    if(entity.leveltimer){
      return entity.leveltimer;
    }
  }
}

export function createDashboardLayer(font: Font, level: Level) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  return function drawDashboard(context: CanvasRenderingContext2D) {
    const playerTrait = getPlayerTrait(level);
    const timerTrait = getTimerTrait(level);

    if (playerTrait) {
      font.print(playerTrait.playerName, context, 16, LINE1);
      font.print(playerTrait.score.toString().padStart(6, '0'), context, 16, LINE2);
      // font.print('+' + playerTrait.lives.toString().padStart(2, '0'), context, 96, LINE1);
      font.print('@x' + playerTrait.coins.toString().padStart(2, '0'), context, 96, LINE2);
    }else{
      console.warn("Dashboard warning: Player not found.");
    }

    font.print('WORLD', context, 152, LINE1);
    font.print('1-1', context, 160, LINE2);

    if(timerTrait){
      font.print('TIME', context, 208, LINE1);
      font.print(timerTrait.currentTime.toFixed().padStart(3, '0'), context, 216, LINE2);
    }else{
      console.warn("Dashboard warning: Timer not found.");
    }
  };
}

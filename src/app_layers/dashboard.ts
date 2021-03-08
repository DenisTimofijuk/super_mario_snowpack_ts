import type Entity from 'src/Entity';
import type { Font } from 'src/vaLoaders/font';

export function createDashboardLayer(font: Font, playerEnv:Entity) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  const score = 24500;
  

  return function drawDashboard(context: CanvasRenderingContext2D) {
    const time = playerEnv.playercontroller?.time ?? 0;

    font.print('MARIO', context, 16, LINE1);
    font.print(score.toString().padStart(6, '0'), context, 16, LINE2);

    font.print('WORLD', context, 152, LINE1);

    font.print('TIME', context, 208, LINE1);
    font.print(time.toFixed().padStart(3, '0'), context, 216, LINE2);
  };
}

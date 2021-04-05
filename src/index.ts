import Camera from './Camera';
import { setupMouseControl } from './debug';
import { setupKeyboard } from './input';
import Timer from './Timer';
import { EntityFactorie, loadEntities } from './entities';
import { createLevelLoader } from './vaLoaders/level';
import { createCollisionLayer } from './app_layers/collision';
import { loadFont } from './vaLoaders/font';
import { createDashboardLayer } from './app_layers/dashboard';
import { createAudioLoader } from './vaLoaders/audio';
import { createPlayer, createPlayerENviroment } from './player';

export interface GameContext {
  audioContext: AudioContext;
  entityFactory: EntityFactorie;
  deltaTime: number | null;
}

async function main(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const audioContext = new AudioContext();
  const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);

  const loadLevel = createLevelLoader(entityFactory);
  const level = await loadLevel('debug-coin');

  const camera = new Camera();

  const mario = createPlayer(entityFactory.mario());
  mario.player && (mario.player.playerName = "MARIO");
  
  const input = setupKeyboard(mario);
  input.listenTo(window);

  // setupMouseControl(canvas, mario, camera);
  const collisionLayer = createCollisionLayer(level);
  collisionLayer && level.comp.layers.push(collisionLayer);

  const playerEnv = createPlayerENviroment(mario);
  level.entities.add(playerEnv);

  level.comp.layers.push(createDashboardLayer(font, level));

  const gameContext: GameContext = {
    audioContext,
    entityFactory,
    deltaTime: null,
  };
  
  const timer = new Timer();
  timer.update = function update(deltaTime: number) {
    gameContext.deltaTime = deltaTime;
    level.update(gameContext);
    camera.pos.x = Math.max(0, mario.pos.x - 100);
    level.comp.draw(ctx, camera);
  };
  timer.start();
}

function startGame() {
  canvas.removeEventListener('click', startGame);
  main(canvas);
}
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.addEventListener('click', startGame);

import { setupMouseControl } from './debug';
import { setupKeyboard } from './input';
import Timer from './Timer';
import { EntityFactorie, loadEntities } from './entities';
import { createLevelLoader } from './vaLoaders/level';
import { createCollisionLayer } from './app_layers/collision';
import { loadFont } from './vaLoaders/font';
import { createDashboardLayer } from './app_layers/dashboard';
import { createPlayer, createPlayerENviroment } from './player';
import SceneRunner from './SceneRunner';

export interface GameContext {
  audioContext: AudioContext;
  entityFactory: EntityFactorie;
  deltaTime: number | null;
  videoContext: CanvasRenderingContext2D;
}

async function main(canvas: HTMLCanvasElement) {
  const videoContext = canvas.getContext('2d')!;
  const audioContext = new AudioContext();
  const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);

  const loadLevel = createLevelLoader(entityFactory);
  const sceneRunner = new SceneRunner();
  const level = await loadLevel<Level_1_1>('1-2');

  const mario = createPlayer(entityFactory.mario());
  mario.player && (mario.player.playerName = "MARIO");
  
  const inputRouter = setupKeyboard(window);
  inputRouter.addReceiver(mario);

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
    videoContext
  };
  sceneRunner.addScene(level);
  
  const timer = new Timer();
  timer.update = function update(deltaTime: number) {
    gameContext.deltaTime = deltaTime;
    sceneRunner.update(gameContext);
  };
  timer.start();
  sceneRunner.runNext();
}

function startGame() {
  canvas.removeEventListener('click', startGame);
  main(canvas);
}
const canvas = document.getElementById('screen') as HTMLCanvasElement;
canvas.addEventListener('click', startGame);

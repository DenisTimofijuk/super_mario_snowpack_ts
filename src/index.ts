import Camera from './Camera';
import { setupMouseControl } from './debug';
import { setupKeyboard } from './input';
import Timer from './Timer';
import { loadEntities } from './entities';
import { createLevelLoader } from './vaLoaders/level';
import Entity from './Entity';
import { PlayerController } from './traits/PlayerController';
import { Solid } from './traits/Solid';
import { createCollisionLayer } from './app_layers/collision';
import { loadFont } from './vaLoaders/font';
import { createDashboardLayer } from './app_layers/dashboard';
import { createAudioLoader } from './vaLoaders/audio';

function createPlayerENviroment(playerEntity: Entity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(new Solid());
  playerEnv.addTrait(playerControl);

  return playerEnv;
}
export interface GameContext {
  audioContext: AudioContext;
  deltaTime: number | null;
}

async function main(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  const audioContext = new AudioContext();
  const [entityFactory, font] = await Promise.all([loadEntities(audioContext), loadFont()]);

  const loadLevel = createLevelLoader(entityFactory);
  const level = await loadLevel('1-1');

  const camera = new Camera();

  const mario = entityFactory.mario();

  const playerEnv = createPlayerENviroment(mario);
  level.entities.add(playerEnv);

  const input = setupKeyboard(mario);
  input.listenTo(window);

  // setupMouseControl(canvas, mario, camera);
  // const collisionLayer = createCollisionLayer(level);
  // collisionLayer && level.comp.layers.push(collisionLayer);

  level.comp.layers.push(createDashboardLayer(font, playerEnv));
  const gameContext: GameContext = {
    audioContext,
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

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);

//  window.addEventListener('keyup', event => console.log(event))

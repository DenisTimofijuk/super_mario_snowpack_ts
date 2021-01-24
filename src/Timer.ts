export default class Timer {
  updateProxy: (time: number) => void;
  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time: number) => {
      accumulatedTime += (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;
      this.enqueue();
    };
  }
  
  update(deltaTime: number) {
    throw new Error('Method not implemented.');
  }

  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.enqueue();
  }
}

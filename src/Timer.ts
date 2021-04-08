export default class Timer {
  updateProxy: (time: number) => void;
  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime:number|null = null;

    this.updateProxy = (time: number) => {
      if (lastTime !== null) {
        accumulatedTime += (time - lastTime) / 1000;

        //temp workaround for fixind page hangups
        if (accumulatedTime > 1) {
          accumulatedTime = 1;
        }

        while (accumulatedTime > deltaTime) {
          this.update(deltaTime);
          accumulatedTime -= deltaTime;
        }
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

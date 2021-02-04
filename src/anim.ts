export function createAnim(frames:MarioFrameName[], frameLen:number) {
    return function resolveFrame(distance:number) {
      const frameIndex = Math.floor(distance / frameLen) % frames.length;
      return frames[frameIndex];
    }
  }
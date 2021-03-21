export default class AudioBoard {
    buffers: Map<AudioName, AudioBuffer>;
  
    constructor() {
      this.buffers = new Map();
    }
  
    addAudio(name: AudioName, buffer: AudioBuffer) {
      this.buffers.set(name, buffer);
    }
  
    playAudio(name: AudioName, context: AudioContext) {
      if (this.buffers.has(name)) {
        const source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = this.buffers.get(name)!;
        source.start(0);
      } else {
        console.warn(`Audio [${name}] was not found.`);
      }
    }
  }
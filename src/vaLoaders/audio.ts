import AudioBoard from "../AudioBoard";
import { loadImage, loadJSON } from "../loaders";

export function createAudioLoader(context:AudioContext) {
    return function loadAudio(url:string) {
        return fetch(url)
        .then(response => {
            return response.arrayBuffer();
        })
        .then(arrayBuffer => {
            return context.decodeAudioData(arrayBuffer);
        })
    }
}

export function loadAudioBoard(name:SoundsJSONfileName, audioContext:AudioContext) {
    const loadAudio = createAudioLoader(audioContext);
    return loadJSON<MarioSoundsJSON>(`/sounds/${name}.json`).then(audioSheet => {
        const audioBoard = new AudioBoard();
        const fx = audioSheet.fx;
        const jobs:Array<Promise<void>> = [];
        Object.keys(fx).forEach( name => {
            const index = name as AudioName;
            const url = fx[index].url;
            const job = loadAudio(url).then(buffer => {
                audioBoard.addAudio(index, buffer);
            })
            jobs.push(job);
        });
        return Promise.all(jobs).then(() => audioBoard);
    })
};
export default class MusicPlayer {
    tracks: Map<MusicTrackName, HTMLAudioElement>;
    constructor() {
        this.tracks = new Map();
    }

    addTrack(name:MusicTrackName, url:string){
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        this.tracks.set(name, audio);
    }

    playTrack(name:MusicTrackName){
        for(const audio of this.tracks.values()){
            audio.pause();
        }

        const audio = this.tracks.get(name);
        if(audio){
            audio.play();
        }

        return audio;
    }
}
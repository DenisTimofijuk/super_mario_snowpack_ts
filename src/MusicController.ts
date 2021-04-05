import type MusicPlayer from "./MusicPlayer";

export default class MusicController {
    player: MusicPlayer;
    constructor() {
        this.player = <any>null;
    }

    setPlayer(player:MusicPlayer){
        this.player = player;
    }

    playTheme(speed = 1){
        const audio = this.player.playTrack('main');
        audio && (audio.playbackRate = speed);
    }

    playHurryTheme(){
        const audio = this.player.playTrack('hurry');
        if(audio){
            audio.loop = false;
            audio.addEventListener('ended', () => this.playTheme(1.3), {once:true});
        }
    }
}
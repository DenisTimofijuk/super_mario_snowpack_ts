import type MusicPlayer from "./MusicPlayer";

export default class MusicController {
    player: MusicPlayer;
    constructor() {
        this.player = <any>null;
    }

    setPlayer(player:MusicPlayer){
        this.player = player;
    }
}
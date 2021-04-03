import MusicPlayer from '../MusicPlayer';
import { loadJSON } from '../loaders';

export function loadMusicSheet(name: MusicJSONfileName) {
  return loadJSON<OverworldMusicJSON>(`/music/${name}.json`).then(
    (musicSheet) => {
      const musicPlayer = new MusicPlayer();
      for (const [name, track] of Object.entries(musicSheet)) {
        musicPlayer.addTrack(name as MusicTrackName, track.url);
      };
      return musicPlayer;
    },
  );
}

type SoundsJSONfileName = 'mario' | 'bullet';
type AudioName = 'jump' | 'stomp' | 'shoot';

type SoundContent = {
    url:string;
}

type SoundEffects = {
    [key in AudioName]: SoundContent
}

interface MarioSoundsJSON {
    fx: SoundEffects;
}

type MusicJSONfileName = 'overworld';
type MusicTracContent = {
    url:string;
}
type MusicTrackName = 'main';

interface OverworldMusicJSON {
    [key in MusicTrackName]: MusicTracContent;
}
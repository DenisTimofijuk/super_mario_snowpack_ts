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

type MusicJSONfileName = 'overworld' | 'hurry';
type MusicTracContent = {
    url:string;
}
type MusicTrackName = 'main' | 'hurry';

type OverworldMusicJSON = {
    [key in MusicTrackName]: MusicTracContent;
}
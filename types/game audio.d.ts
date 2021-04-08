type SoundsJSONfileName = 'mario' | 'bullet';
type AudioName = 'jump' | 'stomp' | 'shoot' | 'coin';

type SoundContent = {
    url:string;
}

type SoundEffects = {
    [key in AudioName]: SoundContent
}

interface MarioSoundsJSON {
    fx: SoundEffects;
}

type MusicJSONfileName = 'overworld' | 'hurry' | 'underworld';
type MusicTracContent = {
    url:string;
}
type MusicTrackName = 'main' | 'hurry';

type OverworldMusicJSON = {
    [key in MusicTrackName]: MusicTracContent;
}
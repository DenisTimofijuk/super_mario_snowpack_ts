type SoundsJSONfileName = 'mario';

type AudioName = 'jump' | 'stomp';

type SoundContent = {
    url:string;
}

type SoundEffects = {
    [key in AudioName]: SoundContent
}

interface MarioSoundsJSON {
    fx: SoundEffects;
}
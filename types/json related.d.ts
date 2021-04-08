type EntityName = 'mario' | 'koopa' | 'goomba' | 'bullet' | 'cannon';
type Sprite_JSON_file_name = 'overworld' | 'underworld' | EntityName | 'bullet-bill' | Pattern_JSON_file_name;

type TyleType = 'ground' | 'sky' | 'brick' | 'coin';

type MarioFrameName = "idle" | "run" | "run-1"  | "run-2" | "run-3" | "break" | "jump";
type EnemiesFrameName = "flat" | "walk" | "walk-1" | "walk-2" | "hiding" | "hiding-with-legs" | "wake";

type CloudSprites = "cloud-1-1" | "cloud-1-2" | "cloud-1-3" | "cloud-2-1" | "cloud-2-2" | "cloud-2-3";

type Cannon = 'cannon-1' | 'cannon-2' | 'cannon-3' | 'bullet';

type PypeSprites = "pipe-insert-vert-left" | "pipe-insert-vert-right" | "pipe-vert-left" | "pipe-vert-right";
type PatternPipeKeys = 'pipe-section-vert' | 'pipe-cap-vert' | 'pipe-2h' | 'pipe-3h' | 'pipe-4h' | 'cloud-single' | 'cannon-2h';

type ChanceSprites = 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
type CoinSprites = 'coin' | 'coin-1' | 'coin-2' | 'coin-3';
type BackgroundSprites = 'ground' | 'sky' | 'chocolate' | 'bricks';

type FontName = '!'|'"'|'#'|'$'|'%'|'&'|'\''|'('|')'|'*'|'+'|','|'-'|'.'|'/'|'0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|':'|';'|'<'|'='|'>'|'?'|'@'|'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H'|'I'|'J'|'K'|'L'|'M'|'N'|'O'|'P'|'Q'|'R'|'S'|'T'|'U'|'V'|'W'|'X'|'Y'|'Z'|'['|'\\'|']'|'^'|'_'|'`'|'a'|'b'|'c'|'d'|'e'|'f'|'g'|'h'|'i'|'j'|'k'|'l'|'m'|'n'|'o'|'p'|'q'|'r'|'s'|'t'|'u'|'v'|'w'|'x'|'y'|'z'|'{'|'|'|'}'|'~';


type BackgroundSpriteName = BackgroundSprites | CloudSprites | PypeSprites | ChanceSprites | Cannon | CoinSprites;
type SpriteSheetName = BackgroundSpriteName | MarioFrameName | EnemiesFrameName | FontName;



type JSON_object = Level_1_1 | Overworld_JSON | Underworld_JSON | Mario_JSON | Goomba_JSON | Koopa_JSON | MarioSoundsJSON | OverworldMusicJSON | OverworldPattern;
import type { Matrix } from "./math";
export default class TileResolver {
    constructor(private matrix:Matrix, public tileSize = 16) {
        
    }

    toIndex(pos:number){
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange(pos1:number, pos2:number){
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range:number[] = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);

        return range;

    }

    getByIndex(index_x:number, index_y:number): GetByIndexResult | undefined{
        const tile = this.matrix.get(index_x, index_y);
        if(tile){
            const y1 = index_y * this.tileSize;
            const y2 = y1 + this.tileSize;
            const x1 = index_x * this.tileSize;
            const x2 = x1 + this.tileSize;
            return {
                tile,
                y1,
                y2,
                x1,
                x2,
            }
        }
    }

    searchByPosition(posX:number, posY:number){
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        )
    }

    searchByRange(x1:number, x2:number, y1:number, y2:number){
        const matches:GetByIndexResult[] = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if(match){
                    matches.push(match)
                }
            })
        })

        return matches;
    }
}
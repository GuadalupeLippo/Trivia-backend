import { IsInt} from 'class-validator';

export class CreateBuyScoreDto {
    @IsInt()
    readonly scoreId: number;
  
    @IsInt()
    readonly playerId:number;
}


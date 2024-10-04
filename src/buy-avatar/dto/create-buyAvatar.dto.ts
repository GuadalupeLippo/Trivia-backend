import { IsInt} from 'class-validator';

export class CreateBuyAvatarDto {
    @IsInt()
    avatarId: number;
  
    @IsInt()
    playerId:number;
    
}

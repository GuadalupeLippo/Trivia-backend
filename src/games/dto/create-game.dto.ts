import { IsInt } from "class-validator";

export class CreateGameDto {
   
    @IsInt()
    playerId: number;
    @IsInt()
    categoryId: number;
    @IsInt()
    difficultyId: number;
    @IsInt()
    answerId: number;


}


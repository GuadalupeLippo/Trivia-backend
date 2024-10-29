import { IsArray, IsInt, IsOptional } from "class-validator";

export class CreateGameDto {
   
    @IsInt()
    playerId: number;
    @IsInt()
    @IsOptional()
    categoryId: number;
    @IsInt()
    difficultyId: number;


}


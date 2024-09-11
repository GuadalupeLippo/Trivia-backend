import { IsInt, IsNumber } from "class-validator";

export class CreatePlayerDto {
    @IsInt()
    userId : number;

    @IsNumber()
    @IsInt()
    score: number;

    @IsNumber()
    @IsInt()
    games: number;

    @IsInt()
    buyAvatarId : number;



}

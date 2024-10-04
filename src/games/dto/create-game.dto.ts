import { IsInt } from "class-validator";

export class CreateGameDto {
    @IsInt()
    playerId : number;

    @IsInt()
    score: number;

    @IsInt()
    categoryId : number;

    @IsInt()
    questionId : number;

    @IsInt()
    answerId : number;

    @IsInt()
    dificultly : number;

}


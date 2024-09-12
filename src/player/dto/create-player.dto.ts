import { IsInt, IsNumber } from "class-validator";

export class CreatePlayerDto {
    @IsInt()
    userId : number;

    @IsInt()
    buyAvatarId : number;



}

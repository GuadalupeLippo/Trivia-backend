import { IsInt, IsNumber, IsOptional } from "class-validator";

export class CreatePlayerDto {
    @IsInt()
    userId : number;

    @IsInt()
    buyAvatarId : number;



}

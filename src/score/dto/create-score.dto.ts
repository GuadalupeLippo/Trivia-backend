import { IsInt, IsNumber } from "class-validator";

export class CreateScoreDto {
@IsInt()
@IsNumber()
points : number;

@IsInt()
@IsNumber()
price : number;
}

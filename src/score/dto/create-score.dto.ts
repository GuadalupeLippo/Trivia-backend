import { IsInt, IsNumber, IsOptional, IsUrl } from "class-validator";

export class CreateScoreDto {
@IsInt()
@IsNumber()
points : number;

@IsInt()
@IsNumber()
price : number;

@IsUrl()
@IsOptional()
image : string;
}

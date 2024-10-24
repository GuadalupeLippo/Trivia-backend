import { IsInt, IsNumber, IsString} from "class-validator";

export class CreateScoreDto {
@IsInt()
@IsNumber()
points : number;

@IsInt()
@IsNumber()
price : number;

@IsString()
image : string;
}

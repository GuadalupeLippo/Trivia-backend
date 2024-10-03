import { IsString, Length } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @Length(1, 500)
    description: string;

    
    
}

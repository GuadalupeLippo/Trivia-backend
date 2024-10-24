import { Type } from "class-transformer";
import { IsString, Length, IsInt, IsArray, ValidateNested } from "class-validator";
import { CreateAnswerDto } from "src/answer/dto/create-answer.dto";

export class CreateQuestionDto {
    @IsString()
    @Length(1, 500)
    description: string;

    @IsInt() 
    categoryId: number; 

    @IsArray()  // Indica que es un array
    @ValidateNested({ each: true })  // Valida cada objeto dentro del array cumpla con el DTO de answer
    @Type(() => CreateAnswerDto)  // Transforma cada objeto en instancia de CreateAnswerDto
    answers: CreateAnswerDto[];
}

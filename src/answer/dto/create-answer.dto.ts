import { IsString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateAnswerDto {

    @IsString()
    description: string; 

    @IsOptional()
    @IsBoolean()
    value?: boolean;  // Opcional para que pueda ser omitido en la solicitud

    @IsInt()
    questionId: number;
}

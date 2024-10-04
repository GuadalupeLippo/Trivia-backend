import { IsString, IsInt, Length } from 'class-validator';
export class CreateAnswerDto {

    @IsString()
    @Length(1, 500)
    image: string;

    @IsInt()
    price: number;
}




import { IsString, IsInt, Length } from 'class-validator';
export class CreateCategoryDto {
    @IsString()
    @Length(1, 500)
    image: string;

    @IsInt()
    price: number;
}



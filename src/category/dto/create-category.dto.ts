import { IsInt, IsString, Length, } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @Length(1, 30)
    type: string;

   @IsString()
   logo:string;

   @IsInt()
   puntos: number;
}



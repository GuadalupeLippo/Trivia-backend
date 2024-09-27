import { IsString, IsInt, Length } from 'class-validator';

export class CreateDifficultyDto {
    @IsString()
    @Length(1, 40)
    nivel: string;
  
    @IsInt()
    duracion: number;

    
}


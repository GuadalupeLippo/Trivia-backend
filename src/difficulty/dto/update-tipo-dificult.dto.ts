import { PartialType } from '@nestjs/mapped-types';
import { CreateDifficultyDto as CreateDifficultyDto } from './create-tipo-dificult.dto';

export class UpdateDifficultyDto extends PartialType(CreateDifficultyDto) {}

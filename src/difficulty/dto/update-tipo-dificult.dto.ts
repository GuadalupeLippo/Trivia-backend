import { PartialType } from '@nestjs/mapped-types';
import { CreateDifficultytDto as CreateDifficultyDto } from './create-tipo-dificult.dto';

export class UpdateDifficultytDto extends PartialType(CreateDifficultyDto) {}

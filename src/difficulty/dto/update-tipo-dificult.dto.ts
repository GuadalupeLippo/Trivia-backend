import { PartialType } from '@nestjs/mapped-types';
import { CreateDifficultytDto } from './create-tipo-dificult.dto';

export class UpdateDifficultytDto extends PartialType(CreateDifficultytDto) {}

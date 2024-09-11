import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDificultDto } from './create-tipo-dificult.dto';

export class UpdateTipoDificultDto extends PartialType(CreateTipoDificultDto) {}

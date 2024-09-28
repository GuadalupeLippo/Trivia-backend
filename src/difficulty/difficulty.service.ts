import { Injectable } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';

@Injectable()
export class DifficultyService {
  create(createTipoDificultDto: UpdateDifficultyDto) {
    return 'This action adds a new tipoDificult';
  }

  findAll() {
    return `This action returns all tipoDificult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDificult`;
  }

  update(id: number, updateTipoDificultDto: UpdateDifficultyDto) {
    return `This action updates a #${id} tipoDificult`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoDificult`;
  }
}

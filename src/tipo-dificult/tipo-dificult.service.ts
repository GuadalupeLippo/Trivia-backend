import { Injectable } from '@nestjs/common';
import { CreateTipoDificultDto } from './dto/create-tipo-dificult.dto';
import { UpdateTipoDificultDto } from './dto/update-tipo-dificult.dto';

@Injectable()
export class TipoDificultService {
  create(createTipoDificultDto: CreateTipoDificultDto) {
    return 'This action adds a new tipoDificult';
  }

  findAll() {
    return `This action returns all tipoDificult`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoDificult`;
  }

  update(id: number, updateTipoDificultDto: UpdateTipoDificultDto) {
    return `This action updates a #${id} tipoDificult`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoDificult`;
  }
}

import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';
import { Question } from 'src/questions/entities/question.entity';

@Injectable()
export class DifficultyService {
  questionRepository: any;
  create(createTipoDificultDto: UpdateDifficultyDto) {
    return 'This action adds a new tipoDificult';
  }

  async findAll(): Promise<Question[]> {
    const question = await this.questionRepository.find()
    if(!question) throw new NotAcceptableException("No question in BasedeDatos")
      return question;
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

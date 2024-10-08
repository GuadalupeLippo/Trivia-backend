import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';
import { Question } from 'src/questions/entities/question.entity';
import { Difficulty } from './entities/difficulty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DifficultyService {
  constructor(@Inject('DIFFICULTY_REPOSITORY')
  private questionRepository: Repository<Difficulty>,
){}

  async create(createTipoDificultDto: UpdateDifficultyDto) {
    const nivel = this.questionRepository.create(createTipoDificultDto)
    return this.questionRepository.save(nivel)
  }

  async findAll(): Promise<Difficulty[]> {
    const difficulty = await this.questionRepository.find()
    if(!difficulty) throw new NotAcceptableException("No difficulty in Database")
      return difficulty;
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

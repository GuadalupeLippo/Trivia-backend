import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';

import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';

import { Difficulty } from './entities/difficulty.entity';
import { Repository } from 'typeorm';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';

@Injectable()
export class DifficultyService {
  constructor(@Inject('DIFFICULTY_REPOSITORY')
  private difficultyRepository: Repository<Difficulty>,
){}

  async create(createDifficultyDto: CreateDifficultyDto):Promise<Difficulty> {
    const difficulty = this.difficultyRepository.create(createDifficultyDto)
    return this.difficultyRepository.save(difficulty);
  }

  async findAll(): Promise<Difficulty[]> {
    const difficulty = await this.difficultyRepository.find({
      where:
      [
        { nivel: 'fácil' },
        { nivel: 'medio' },
        { nivel: 'difícil' },
      ],
      relations:['games']
    })
    if(difficulty.length === 0) throw new NotAcceptableException("No difficulty in Database")
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

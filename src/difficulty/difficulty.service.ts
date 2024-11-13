import { Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';

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
    const difficulty = await this.difficultyRepository.createQueryBuilder("difficulty")
    .loadRelationCountAndMap("difficulty.gamesCount","difficulty.games")
    .where("difficulty.nivel IN (:...niveles)", { niveles: ['fácil', 'medio', 'difícil'] })
    .getMany();
    if(difficulty.length === 0) throw new NotAcceptableException("No difficulty in Database")
      return difficulty;
  }

  async findOneDifficulty(diffId: number): Promise<Difficulty> {
    try {
    const difficulty = await this.difficultyRepository.createQueryBuilder("difficulty")
    .loadRelationCountAndMap("difficulty.gamesCount","difficulty.games")
    .where("difficulty.id = :id", { id: diffId })
    .getOne();
    if (!difficulty) throw new NotFoundException("No difficulty in database");
      return difficulty
    } catch {
        throw new NotFoundException("No difficulty in database")}
  }

  async update(id: number, updateDifficultyDto: UpdateDifficultyDto) {
    const difficulty = await this.difficultyRepository.preload({
      id: id,
      ...updateDifficultyDto
    })
    if (!difficulty) throw new NotFoundException(`Difficulty with id ${id} not found`)
    return await this.difficultyRepository.save(difficulty)
  }

  async remove(id: number): Promise<void> {
    const difficulty = await this.difficultyRepository.findOne({ where: { id } });
    if (!difficulty) {
        throw new NotFoundException(`Difficulty with id ${id} not found`);
    }
    await this.difficultyRepository.remove(difficulty);
  }
  
}

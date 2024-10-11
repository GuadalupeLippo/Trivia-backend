import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';
import { scoreRepository } from 'src/constants/constant';

@Injectable()
export class ScoreService {
  constructor(
    @Inject(scoreRepository)
    private scoreRepository: Repository<Score>,
  ){}

  async createOneScore(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(createScoreDto)
    return await this.scoreRepository.save(score)
  }
  async findAllScore(): Promise<Score[]> {
    const score= await this.scoreRepository.find()
    if (!score) throw new NotFoundException("No scores in database")
    return score
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  async updateScore(id: number, updateScoreDto: UpdateScoreDto) {
    const score = await this.scoreRepository.preload({
      id: id,
      ...updateScoreDto
    })
    if (!score) throw new NotFoundException(`score with id ${id} not found`)
    return await this.scoreRepository.save(score)
  }

  async deleteScore(id: number) : Promise <String> {
    const score = await this.scoreRepository.findOne({ where: { id } });
    if (!score) throw new NotFoundException(`Score with id ${id} not found`);
    await this.scoreRepository.remove(score)
    return 'score Deleted'
  } 
}

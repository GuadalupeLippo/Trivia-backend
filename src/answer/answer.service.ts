import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import {  updateAnswerDto } from './dto/update-answer.dto'
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')  // Inyectamos el provider manualmente
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const newAnswer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(newAnswer);
  }

  findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answerRepository.findOneBy({ id });
  }

  async update(id: number, updateAnswerDto: updateAnswerDto): Promise<Answer> {
    await this.answerRepository.update(id, updateAnswerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.answerRepository.delete(id);
  }
}

import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
 

  constructor(@Inject('QUESTION_REPOSITORY')
    private questionRepository: Repository<Question>,
  ){}


 async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto)
    return this.questionRepository.save(question)

  
  }
  
  async findAll(): Promise<Question[]> {
    const question = await this.questionRepository.find({
      relations: [],
    });
    
    if(!question || question.length === 0) throw new NotAcceptableException("No question in BasedeDatos")
      return question;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

 async update(id: number, updateQuestionDto: UpdateQuestionDto) {
   const question  = await this.questionRepository.preload({
    id: id,
    ...updateQuestionDto
   })
   if(!question) throw new NotAcceptableException('question con id: ${id} No se encuentra')
    return await this.questionRepository.save(question)
  }

  async remove(id: number): Promise<void> {
    const question = await this.questionRepository.findOne({where: {id} });
    if(!question) throw new NotAcceptableException('question con id: ${id} No se encuentra')
      await this.questionRepository.remove(question)


   
  }
}

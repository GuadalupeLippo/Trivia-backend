import { Inject,
  Injectable,
  NotAcceptableException, 
  NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { answerRepository, categoryRepository,
   questionRepository } from 'src/constants/constant';
import { Category } from 'src/category/entities/category.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

@Injectable()
export class QuestionsService {
  constructor(@Inject(questionRepository)
    private questionRepository: Repository<Question>,
    @Inject(categoryRepository)
    private categoryRepository: Repository<Category>,
  @Inject(answerRepository)
  private answerRepository : Repository<Answer>

  ){}

  async createQuestionWhitAnswers(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const category = await this.categoryRepository.findOne({ where: { id: createQuestionDto.categoryId } });
    if (!category) {
        throw new NotFoundException('Category not found');
    }

    const question = this.questionRepository.create({
        description: createQuestionDto.description,
        category,
    });

    
    const savedQuestion = await this.questionRepository.save(question);
    

    //guardar las respuestas
    const answers = createQuestionDto.answers.map((answerDto: CreateAnswerDto) => {
        return this.answerRepository.create({
            description: answerDto.description,
            value: answerDto.value,
            question: savedQuestion, 
        });
    });

    await this.answerRepository.save(answers);

    // Devolver la pregunta guardada con sus respuestas
    return await this.questionRepository.findOne({ where: { id: savedQuestion.id }, relations: ['answers'] });
}


  
  async findAll(): Promise<Question[]> {
    const question = await this.questionRepository.find({
      relations: ['answers'],
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

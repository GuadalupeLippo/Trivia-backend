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
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class QuestionsService {
  @Inject(questionRepository)
    private questionRepository: Repository<Question>
  @Inject(categoryRepository)
    private categoryRepository: Repository<Category>
  @Inject(answerRepository)
    private answerRepository : Repository<Answer>
  constructor(private categoryService: CategoryService
  ){}

  async createMultipleQuestionsWithAnswers(createQuestionsDto: CreateQuestionDto[]): Promise<Question[]> {
    const savedQuestions = [];
    for (const createQuestionDto of createQuestionsDto) {
        const category = await this.categoryRepository.findOne({ where: { id: createQuestionDto.categoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${createQuestionDto.categoryId} not found`);
        }
        
        const question = this.questionRepository.create({
            description: createQuestionDto.description,
            category,
        });
        const savedQuestion = await this.questionRepository.save(question);
        
        const answers = createQuestionDto.answers.map((answerDto: CreateAnswerDto) => {
            return this.answerRepository.create({
                description: answerDto.description,
                value: answerDto.value,
                question: savedQuestion,
            });
        });
        await this.answerRepository.save(answers);
      
        const fullQuestion = await this.questionRepository.findOne({
            where: { id: savedQuestion.id },
            relations: ['answers']
        });
        savedQuestions.push(fullQuestion);
    }
    return savedQuestions; 
}


  
  async getAllQuestions(): Promise<Question[]> {
    const question = await this.questionRepository.find({
      relations: ['answers'],
    });
    
    if(!question || question.length === 0) throw new NotAcceptableException("No question in BasedeDatos")
      return question;
  }

  async getRandomQuestions() {
    try{
      const questions = await this.questionRepository.find({
        relations:['answers'] });;
        if (!questions) {
          throw new Error('question Not found')};

      const randomQuestions = this.categoryService.shuffleArray(questions).slice(1,51)

      return randomQuestions;
    } catch (err) {
          throw new NotFoundException(err.message)
      }
  }

  
 async update(id: number, updateQuestionDto: UpdateQuestionDto) : Promise<Question> {
   const question  = await this.questionRepository.preload({
    id: id,
    ...updateQuestionDto
   })
   if(!question) throw new NotAcceptableException('question con id: ${id} No se encuentra')
    return await this.questionRepository.save(question)
  }

  async remove(id: number): Promise<String> {
    const question = await this.questionRepository.findOne({where: {id} });
    if(!question) throw new NotAcceptableException('question con id: ${id} No se encuentra')
      await this.questionRepository.remove(question)
    return 'question deleted' 
  }
}

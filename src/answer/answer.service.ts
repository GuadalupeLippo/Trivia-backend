import { Inject, Injectable , NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';  
import { Answer } from './entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { answerRepository, questionRepository} from 'src/constants/constant';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(answerRepository)
    private answerRepository: Repository<Answer>,
    @Inject(questionRepository)
    private questionRepository: Repository<Question>,
  ){}

 
  async createOne(createAnswerDto:CreateAnswerDto): Promise<Answer> {
  
    //Crear la nueva respuesta con relación a la pregunta
    const answer = this.answerRepository.create({
      ...createAnswerDto,
  
    });
    return await this.answerRepository.save(answer);
  }


  async findAll(): Promise<Answer[]> {
    const answers = await this.answerRepository.find({
      relations: ['question']
    })
    if (!answers.length) throw new NotFoundException("No answers in database")
    return answers
  }


  async update(id: number, updateanswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
    }
  
    //Actualizar otros campos de la respuesta
    Object.assign(answer, updateanswerDto);
    return await this.answerRepository.save(answer);
  }

  async remove(id: number): Promise<void> {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) throw new NotFoundException(`Answer with id ${id} not found`);
    await this.answerRepository.remove(answer);
  }
}

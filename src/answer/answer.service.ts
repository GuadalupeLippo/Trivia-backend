import { Inject, Injectable , NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';  
import { Answer } from './entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { questionRepository} from 'src/constants/constant';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<Answer>,
    @Inject(questionRepository)
    private questionRepository: Repository<Question>,
  ){}

 
  async createOne(createAnswerDto:CreateAnswerDto): Promise<Answer> {
    //buscar question por id
    const question = await this.questionRepository.findOneBy({
      id: createAnswerDto.questionId,
    });
    if (!question) {
      throw new NotFoundException(
        `Question with id ${createAnswerDto.questionId} not found`,
      );
    }
    //Crear la nueva respuesta con relación a la pregunta
    const answer = this.answerRepository.create({
      ...createAnswerDto,
      question, //asociar el pregunta a respuesta
    });
    return await this.answerRepository.save(answer);
  }


  async findAll(): Promise<Answer[]> {
    const answers = await this.answerRepository.find()
    if (!answers.length) throw new NotFoundException("No answers in database")
    return answers
  }


  async update(id: number, updateanswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
    }
    //Actualizar question si se proporciona un nuevo questionId
    if (updateanswerDto.questionId) {
      const question = await this.questionRepository.findOneBy({
        id: updateanswerDto.questionId,
      });
      if (!question) {
        throw new NotFoundException(
          `Question with id ${updateanswerDto.questionId} not found`,
        );
      }
      answer.question = question;
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

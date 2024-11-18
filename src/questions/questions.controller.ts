import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

 @Get()
  async findAll() {
    return  await this.questionsService.getAllQuestions();
  }

  @Get('/random')
  async getRandomQuestions() {
    return await this.questionsService.getRandomQuestions();
  }

  @Post()
  async createMultipleQuestionWithAnswers(@Body() createQuestionDto: CreateQuestionDto[]) {
    return this.questionsService.createMultipleQuestionsWithAnswers(createQuestionDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.questionsService.remove(+id);
  }
}

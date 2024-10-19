import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

 @Get()
  async findAll() {
    return  await this.questionsService.findAll();
  }
   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }
  @Post()
  async createQuestionWithAnswers(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionsService.createQuestionWhitAnswers(createQuestionDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}

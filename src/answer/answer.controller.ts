import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('/answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createOne(createAnswerDto);
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}

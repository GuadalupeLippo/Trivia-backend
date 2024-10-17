import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  createOneScore(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.createOneScore(createScoreDto);
  }

  @Get()
  findAllScore() {
    return this.scoreService.findAllScore();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  updateScore(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.updateScore(+id, updateScoreDto);
  }

  @Delete(':id')
  deleteScore(@Param('id') id: string) {
    return this.scoreService.deleteScore(+id);
  }
}

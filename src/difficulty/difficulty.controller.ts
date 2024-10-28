import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';

@Controller('difficulty')
export class difficultyController {
  constructor(private readonly DifficultyService: DifficultyService) {}

  @Post()
  async create(@Body() createTipoDificultDto: CreateDifficultyDto) {
    return await this.DifficultyService.create(createTipoDificultDto);
  }

  @Get()
  async findAll() {
    return await this.DifficultyService.findAll();
  }

  @Get(':id')
  async findOneDifficulty(@Param('id', ParseIntPipe) id: number) {
    return await this.DifficultyService.findOneDifficulty(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTipoDificultDto: UpdateDifficultyDto) {
    return await this.DifficultyService.update(+id, updateTipoDificultDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.DifficultyService.remove(+id);
  }
}

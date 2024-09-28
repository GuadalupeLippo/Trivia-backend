import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { CreateDifficultyDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultyDto } from './dto/update-tipo-dificult.dto';

@Controller('difficulty')
export class difficultyController {
  constructor(private readonly DifficultyService: DifficultyService) {}

  @Post()
  create(@Body() createTipoDificultDto: CreateDifficultyDto) {
    return this.DifficultyService.create(createTipoDificultDto);
  }

  @Get()
  findAll() {
    return this.DifficultyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.DifficultyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDificultDto: UpdateDifficultyDto) {
    return this.DifficultyService.update(+id, updateTipoDificultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.DifficultyService.remove(+id);
  }
}

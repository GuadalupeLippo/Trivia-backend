import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DifficultyService } from './tipo-dificult.service';
import { CreateDifficultytDto } from './dto/create-tipo-dificult.dto';
import { UpdateDifficultytDto } from './dto/update-tipo-dificult.dto';

@Controller('difficulty')
export class difficultyController {
  constructor(private readonly tipoDificultService: DifficultyService) {}

  @Post()
  create(@Body() createTipoDificultDto: CreateDifficultytDto) {
    return this.tipoDificultService.create(createTipoDificultDto);
  }

  @Get()
  findAll() {
    return this.tipoDificultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoDificultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDificultDto: UpdateDifficultytDto) {
    return this.tipoDificultService.update(+id, updateTipoDificultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDificultService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoDificultService } from './tipo-dificult.service';
import { CreateTipoDificultDto } from './dto/create-tipo-dificult.dto';
import { UpdateTipoDificultDto } from './dto/update-tipo-dificult.dto';

@Controller('tipo-dificult')
export class TipoDificultController {
  constructor(private readonly tipoDificultService: TipoDificultService) {}

  @Post()
  create(@Body() createTipoDificultDto: CreateTipoDificultDto) {
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
  update(@Param('id') id: string, @Body() updateTipoDificultDto: UpdateTipoDificultDto) {
    return this.tipoDificultService.update(+id, updateTipoDificultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoDificultService.remove(+id);
  }
}

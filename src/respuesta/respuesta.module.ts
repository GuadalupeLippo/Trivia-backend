import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './respuesta.entity';
import { Pregunta } from 'src/pregunta/pregunta.entity';
import { Categoria } from 'src/categoria/categoria.entity';

import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
imports: [  TypeOrmModule.forFeature([Respuesta, Pregunta, Categoria]),  // Otras importaciones aqu%C3%AD si es necesario],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respuesta } from './entities/respuesta.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';

import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
imports: [  TypeOrmModule.forFeature([Respuesta, Question, Categoria]),],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}

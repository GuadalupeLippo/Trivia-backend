import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespuestaController } from '../respuesta/respuesta.controller';
import { RespuestaService } from '../respuesta/respuesta.service';
import { Respuesta } from '../respuesta/entities/respuesta.entity';
import { Question } from '../questions/entities/question.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Respuesta, Question, Categoria]),
    
  ],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}

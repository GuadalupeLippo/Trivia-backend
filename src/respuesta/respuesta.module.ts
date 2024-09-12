import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
imports: [  // Elimina o comenta la l%C3%ADnea conflictiva si no quieres la importaci%C3%B3n de TypeOrmModule.forFeature  // TypeOrmModule.forFeature([Respuesta, Question, Categoria]),],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}

import { Module } from '@nestjs/common';
import { RespuestaService } from './respuesta.service';
import { RespuestaController } from './respuesta.controller';

@Module({
imports: [  // TypeOrmModule.forFeature([Respuesta, Question, Categoria]), // Esta l%C3%ADnea est%C3%A1 comentada en master, puedes ajustarla si es necesario.],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}

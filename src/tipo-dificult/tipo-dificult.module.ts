import { Module } from '@nestjs/common';
import { TipoDificultService } from './tipo-dificult.service';
import { TipoDificultController } from './tipo-dificult.controller';

@Module({
  controllers: [TipoDificultController],
  providers: [TipoDificultService],
})
export class TipoDificultModule {}

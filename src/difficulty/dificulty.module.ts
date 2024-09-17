import { Module } from '@nestjs/common';
import { difficultyController } from './difficulty.controller';
import { DifficultyService } from './tipo-dificult.service';

@Module({
  controllers: [difficultyController],
  providers: [DifficultyService],
})
export class TipoDificultModule {}

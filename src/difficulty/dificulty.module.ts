import { Module } from '@nestjs/common';
import { difficultyController } from './difficulty.controller';
import { DifficultyService } from './difficulty.service';
import { DatabaseModule } from 'src/database/database.module';
import { difficultyProviders } from './difficulty.providers';
import { gameProviders } from 'src/games/games.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [difficultyController],
  providers: [...difficultyProviders,
    ...gameProviders,
    DifficultyService],
})
export class DifficultyModule {}

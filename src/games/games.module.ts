import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from 'src/player/player.providers';
import { categoryProviders } from 'src/category/category.providers';
import { difficultyProviders } from 'src/difficulty/difficulty.providers';
import { gameProviders } from './games.providers';
import { questionProviders } from 'src/questions/questions.providers';


@Module({
  imports:[DatabaseModule],
  controllers: [GamesController],
  providers: [GamesService,
    ...playerProviders,
    ...categoryProviders,
    ...difficultyProviders,
    ...questionProviders,
    ...gameProviders

  ],
})
export class GamesModule {}

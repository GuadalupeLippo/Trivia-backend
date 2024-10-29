import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from 'src/player/player.providers';
import { categoryProviders } from 'src/category/category.providers';
import { difficultyProviders } from 'src/difficulty/difficulty.providers';
import { gameProviders } from './games.providers';
import { questionProviders } from 'src/questions/questions.providers';
import { CategoryService } from 'src/category/category.service';
import { QuestionsService } from 'src/questions/questions.service';
import { answerProviders } from 'src/answer/answer.providers';


@Module({
  imports:[DatabaseModule],
  controllers: [GamesController],
  providers: [GamesService,
    ...playerProviders,
    ...categoryProviders,
    ...difficultyProviders,
    ...questionProviders,
    ...gameProviders,
    ...answerProviders,
    CategoryService,
    QuestionsService

  ],
})
export class GamesModule {}

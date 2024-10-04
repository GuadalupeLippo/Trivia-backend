import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';
import { QuestionsModule } from './questions/questions.module';

import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { ScoreModule } from './score/score.module';
import { BuyScoreModule } from './buy-score/buy-score.module';
import { AuthModule } from './auth/auth.module';
import { AnswerModule } from './answer/answer.module';

import { DifficultyModule } from './difficulty/dificulty.module';


@Module({
  imports: [ 
    AvatarsModule, 
    BuyAvatarModule, 
    QuestionsModule, 
    DifficultyModule, 
    UserModule, 

    PlayerModule, ScoreModule, BuyScoreModule, AuthModule, AnswerModule

  ], 
 

controllers: [AppController],
  providers: [AppService]
 
} )
export class AppModule {}

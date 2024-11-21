import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';
import { QuestionsModule } from './questions/questions.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { ScoreModule } from './score/score.module';
import { BuyScoreModule } from './buy-score/buy-score.module';
import { AuthModule } from './auth/auth.module';
import { AnswerModule } from './answer/answer.module';

import { DifficultyModule } from './difficulty/dificulty.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { HealthModule } from './health/health.module';
import { GamesModule } from './games/games.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }), 
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    AvatarsModule, 
    BuyAvatarModule, 
    QuestionsModule, 
    DifficultyModule, 
    UserModule, 
    PlayerModule, 
    ScoreModule, BuyScoreModule,
    AuthModule,
    AnswerModule,
    HealthModule,
    CategoryModule,
    GamesModule,
    MercadoPagoModule
  ], 
 

controllers: [AppController],
  providers: [AppService,
    {provide: APP_GUARD,
    useClass: ThrottlerGuard
  }]
 
} )
export class AppModule {}

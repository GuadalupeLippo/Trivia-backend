import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RespuestaModule } from './respuesta/respuesta.module';
import { CategoriaModule } from './categoria/categoria.module';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';
import { QuestionsModule } from './questions/questions.module';
import { TipoDificultModule } from './tipo-dificult/tipo-dificult.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    RespuestaModule, 
    CategoriaModule, 
    AvatarsModule, 
    BuyAvatarModule, 
    QuestionsModule, 
    TipoDificultModule, 
    UserModule, 
    PlayerModule, ScoreModule
  ],
});

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

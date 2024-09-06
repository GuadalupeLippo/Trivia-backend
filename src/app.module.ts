import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';
import { QuestionsModule } from './questions/questions.module';
import { TipoDificultModule } from './tipo-dificult/tipo-dificult.module';
import { UserModule } from './user/user.module';
import { PlayerModule } from './player/player.module';



@Module({
  imports: [AvatarsModule, BuyAvatarModule, QuestionsModule, TipoDificultModule, UserModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

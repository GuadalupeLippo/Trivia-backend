import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';
import { QuestionsModule } from './questions/questions.module';



@Module({
  imports: [AvatarsModule, BuyAvatarModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

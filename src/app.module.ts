import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';
import { BuyAvatarModule } from './buy-avatar/buyAvatar.module';



@Module({
  imports: [AvatarsModule, BuyAvatarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

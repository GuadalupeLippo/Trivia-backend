import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AvatarsModule } from './avatars/avatars.module';


@Module({
  imports: [AvatarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

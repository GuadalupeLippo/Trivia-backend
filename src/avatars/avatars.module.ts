import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsController } from './avatars.controller';
import { avatarProviders } from './avatars.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AvatarsController],
  providers: [
    ...avatarProviders,
    AvatarsService],
})
export class AvatarsModule {}

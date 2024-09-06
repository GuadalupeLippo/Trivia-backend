import { Module } from '@nestjs/common';
import { BuyAvatarService } from './buyAvatar.service';
import { BuyAvatarController } from './buyAvatar.controller';
import { DatabaseModule } from 'src/database/database.module';
import { buyAvatarProviders } from './buyAvatar.providers';
import { avatarProviders } from 'src/avatars/avatars.providers';
import { playerProviders } from 'src/player/player.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyAvatarController],
  providers: [
    ...buyAvatarProviders,
    ...avatarProviders,
    ...playerProviders,
    BuyAvatarService,
  ],
})
export class BuyAvatarModule {}

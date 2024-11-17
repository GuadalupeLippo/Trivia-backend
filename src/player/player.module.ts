import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from './player.providers';
import { userProviders } from 'src/user/user.providers';
import { buyAvatarProviders } from 'src/buy-avatar/buyAvatar.providers';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from 'src/games/games.module';

@Module({
  imports: [DatabaseModule, 
    ConfigModule,GamesModule
  ],
  controllers: [PlayerController],
  providers: [...playerProviders,
    ...userProviders,
    ...buyAvatarProviders,
    PlayerService],
})
export class PlayerModule {}

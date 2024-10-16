import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { playerProviders } from 'src/player/player.providers';
import { HashService } from 'src/auth/hash/hash.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders,
    ...playerProviders,
    UserService, 
  HashService],
})
export class UserModule {}

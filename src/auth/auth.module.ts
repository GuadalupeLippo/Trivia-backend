import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash/hash.service';
import { userProviders } from 'src/user/user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, 
    HashService, 
    ...userProviders]
})
export class AuthModule {}

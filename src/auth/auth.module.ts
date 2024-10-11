import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash/hash.service';
import { userProviders } from 'src/user/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from 'src/player/player.providers';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config'


@Module({
 

  imports: [DatabaseModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1h'}
    }),
    ConfigModule.forRoot({
      isGlobal: true, // Esto hace que ConfigModule esté disponible globalmente
    }),],
  controllers: [AuthController],
  providers: [AuthService, 
    HashService, 
    ...userProviders,
  ...playerProviders],
  
})


export class AuthModule {}

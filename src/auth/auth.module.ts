import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from 'src/player/player.providers';
import { userProviders } from 'src/user/user.providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash/hash.service';


@Module({
 

  imports: [DatabaseModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '1d'}
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

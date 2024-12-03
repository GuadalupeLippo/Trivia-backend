import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';
import { MercadoPagoController } from './mercado-pago.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigService } from '@nestjs/config';
import { PlayerService } from 'src/player/player.service';
import { gameProviders } from 'src/games/games.providers';
import { playerProviders } from 'src/player/player.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService,
    ConfigService,
    PlayerService,
    ...playerProviders,
    ...gameProviders
  ],
})
export class MercadoPagoModule {}

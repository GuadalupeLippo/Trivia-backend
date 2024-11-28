import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { ConfigService } from '@nestjs/config';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class MercadoPagoService {
  constructor(private configService: ConfigService,
    private playerService: PlayerService) {
    const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');

    mercadopago.configure({
      access_token: accessToken,
    });
  }

  createPreference(preferenceData) {
    return mercadopago.preferences.create(preferenceData);
  }

  async handlePaymentNotification(notificationData: any) {
    try {
      const paymentId = notificationData.data.id;
      const payment = await mercadopago.payment.findById(paymentId);

      if (payment.body.status === 'approved') {
        const { description } = payment.body;
        const points = payment.body.pointsAmount; 
        const playerId = payment.body.metadata.playerId; 

        if (playerId && points) {
          await this.playerService.updateScore(playerId, points);
        }
      }
    } catch (error) {
      console.error('Error al manejar la notificación de pago:', error);
    }
  }
}

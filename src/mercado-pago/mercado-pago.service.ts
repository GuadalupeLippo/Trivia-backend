import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { ConfigService } from '@nestjs/config';
import { PlayerService } from 'src/player/player.service';

@Injectable()
export class MercadoPagoService {
  constructor(
    private configService: ConfigService,
    private playerService: PlayerService,
  ) {
    const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');
    console.log('Access Token de MercadoPago obtenido:', accessToken); // Log del token configurado

    mercadopago.configure({
      access_token: accessToken,
    });

    console.log('MercadoPago configurado correctamente'); // Verificación de configuración
  }

  createPreference(preferenceData) {
    console.log('Datos enviados para crear la preferencia:', preferenceData); // Inspección del payload
    return mercadopago.preferences.create(preferenceData);
  }

  async handlePaymentNotification(notificationData: any) {
    console.log('Notificación recibida:', notificationData); // Log inicial de la notificación

    try {
      const paymentId = notificationData.data.id;
      console.log('ID del pago obtenido de la notificación:', paymentId); // Log del ID del pago

      const payment = await mercadopago.payment.findById(paymentId);
      console.log('Datos del pago recuperados:', payment.body); // Inspección de los datos del pago

      if (payment.body.status === 'approved') {
        console.log('El pago fue aprobado'); // Confirmación del estado del pago

        const { metadata } = payment.body;
        console.log('Metadata del pago aprobado:', metadata); // Inspección de los metadatos

        const points = metadata?.pointsAmount;
        const playerId = metadata?.playerId;

        if (playerId && points) {
          console.log(`Sumando ${points} puntos al jugador con ID ${playerId}`); // Confirmación de la operación
          await this.playerService.updateScore(playerId, points);
          console.log('Puntos sumados exitosamente'); // Confirmación del éxito
        } else {
          console.warn('Faltan datos en el pago aprobado:', metadata); // Advertencia en caso de datos incompletos
        }
      } else {
        console.warn('El estado del pago no es "approved":', payment.body.status); // Advertencia si el pago no es aprobado
      }
    } catch (error) {
      console.error('Error al manejar la notificación de pago:', error); // Manejo de errores
    }
  }
}

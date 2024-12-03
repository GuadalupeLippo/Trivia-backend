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
    console.log('Datos enviados para crear la preferencia:', preferenceData);
    return mercadopago.preferences.create(preferenceData);
  }
  async handlePaymentNotification({ id, topic }: { id: string; topic: string }) {
    
  
    if (topic === 'payment' || topic === 'merchant_order') {
      const paymentId = Number(id);
      if (isNaN(paymentId)) {
        throw new Error(`ID de pago inválido: ${id}`);
      }
  
      try {
        if (topic === 'payment') {
         
          const payment = await mercadopago.payment.findById(paymentId);
          console.log('Datos del pago:', payment.body);
  
          if (payment.body.status === 'approved') {
            const { metadata } = payment.body;
            const points = metadata?.points_amount;
            const playerId = metadata?.player_id;
  
            playerId && points ? await this.playerService.updateScore(playerId, points) :
              console.warn('Faltan datos en la metadata del pago');

              return 'approved';
          } else {
            console.warn(`El estado del pago no es "approved": ${payment.body.status}`);
          }
        } else if (topic === 'merchant_order') {
  
          const merchantOrder = await mercadopago.merchant_orders.findById(paymentId);
          console.log('Datos del merchant_order:', merchantOrder.body);
  
          // Aquí podrías realizar la lógica específica para "merchant_order"
          if (merchantOrder.body.status === 'closed') {
            const payment = merchantOrder.body.payments.find(p => p.status === 'approved');
            
            if (payment) {
              console.log('Pago aprobado dentro del merchant_order:', payment);
              // Lógica para procesar el pago aprobado dentro del merchant_order
              const { metadata } = payment;
              const points = metadata?.points_amount;
              const playerId = metadata?.player_id;
  
              playerId && points ? await this.playerService.updateScore(playerId, points) :
                console.warn('Faltan datos en la metadata del pago');
              
              console.log('Merchant order aprobado:', merchantOrder.body);
              return 'approved';
            } else {
              console.warn(`El estado del merchant order no es "approved": ${merchantOrder.body.status}`);
            }
          }
        }
      } catch (error) {
        console.error('Error al procesar la notificación:', error);
        throw new Error('Error al procesar la notificación');
      }
    } else {
      console.warn(`Topic no reconocido: ${topic}`);
    }
  }
  
}

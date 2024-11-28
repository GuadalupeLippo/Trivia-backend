import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('/create_preference')
  async createPreference(@Body() preferenceData) {
    try {
      const response = await this.mercadoPagoService.createPreference(preferenceData);

      return { id: response.body.id };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  // Endpoint para recibir la notificación de pago (webhook)
  @Post('/notificacion')
  @HttpCode(HttpStatus.OK)
  async handlePaymentNotification(@Body() notificationData: any) {
    try {
      await this.mercadoPagoService.handlePaymentNotification(notificationData);
    } catch (error) {
      console.error('Error al procesar la notificación de pago:', error);
      throw error;
    }
  }

}

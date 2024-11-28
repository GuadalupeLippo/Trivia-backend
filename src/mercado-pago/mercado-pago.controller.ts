import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MercadoPagoService } from './mercado-pago.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('/create_preference')
  async createPreference(@Body() preferenceData) {
    console.log('Solicitud para crear preferencia recibida con los siguientes datos:', preferenceData); // Log de los datos recibidos

    try {
      const response = await this.mercadoPagoService.createPreference(preferenceData);
      console.log('Preferencia creada exitosamente, respuesta de MercadoPago:', response.body); // Log de la respuesta de MercadoPago

      return { id: response.body.id };
    } catch (error) {
      console.error('Error al crear la preferencia:', error); // Log en caso de error
      throw error;
    }
  }

  // Endpoint para recibir la notificación de pago (webhook)
  @Post('/notificacion')
  @HttpCode(HttpStatus.OK)
  async handlePaymentNotification(@Body() notificationData: any) {
    console.log('Notificación de pago recibida:', notificationData); // Log de los datos recibidos en la notificación

    try {
      await this.mercadoPagoService.handlePaymentNotification(notificationData);
      console.log('Notificación de pago procesada exitosamente'); // Confirmación del éxito
    } catch (error) {
      console.error('Error al procesar la notificación de pago:', error); // Log en caso de error
      throw error;
    }
  }
}

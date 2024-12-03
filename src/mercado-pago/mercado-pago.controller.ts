import { Controller, Post, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
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

 
 @Post('/notificacions')
  @HttpCode(HttpStatus.OK)
  async handlePaymentNotification(@Query() query: { id: string; topic: string }) {
    console.log('Notificación recibida:', query); // Log de los datos recibidos en la notificación

    if (!query.id || !query.topic) {
      console.warn('Faltan datos en la notificación: id o topic');
      return { message: 'Faltan datos en la notificación' };
    }
  
    if (query.topic === 'payment' || query.topic === 'merchant_order') {
      try {
        const paymentStatus = await this.mercadoPagoService.handlePaymentNotification({
          id: query.id,
          topic: query.topic,
        });
        console.log('Notificación procesada exitosamente',paymentStatus);
        paymentStatus === 'approved'? {message: 'Pago exitoso', success: true } : { message: 'Pago no aprobado', success: false };  
        
      } catch (error) {
        console.error('Error al procesar la notificación de pago:', error);
        throw error;
      }
    } else {
      console.warn('Tipo de notificación no reconocido:', query.topic);
      return { message: 'Tipo de notificación no reconocido' };
    }
}
}

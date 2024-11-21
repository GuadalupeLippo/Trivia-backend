import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MercadoPagoService {
  constructor(private configService: ConfigService) {
    const accessToken = this.configService.get<string>('MP_ACCESS_TOKEN');

    // Configura MercadoPago con tu token de acceso
    mercadopago.configure({
      access_token: accessToken,
    });
  }

  createPreference(preferenceData) {
    return mercadopago.preferences.create(preferenceData);
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RespuestaModule } from './respuesta/respuesta.module';

@Module({
  imports: [RespuestaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

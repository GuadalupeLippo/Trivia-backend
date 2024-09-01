import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RespuestaModule } from './respuesta/respuesta.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [RespuestaModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

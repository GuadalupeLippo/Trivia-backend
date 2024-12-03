import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as ngrok from 'ngrok';


 dotenv.config();
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 

  ngrok.connect(3000).then(url => {
    console.log(`Servidor disponible en: ${url}`);
    
  }).catch((error) => {
    console.error('Error al iniciar Ngrok:', error);
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();


  await app.listen(3000);
  
}
bootstrap();
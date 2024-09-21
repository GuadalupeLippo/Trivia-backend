import { Module } from '@nestjs/common';
import { answerProviders } from './answer.providers';  // Importamos el provider manual
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  controllers: [AnswerController],
  providers: [
    AnswerService,
    ...answerProviders,  // Registramos el provider aquí
  ],
})
export class AnswerModule {}

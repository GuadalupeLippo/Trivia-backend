import { Module } from '@nestjs/common';
import { answerProviders } from './answer.providers';  // Importamos el provider manual
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    ...answerProviders,  // Registramos el provider aquí
  ],
})
export class AnswerModule {}

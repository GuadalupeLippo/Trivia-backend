import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { answerProviders } from './answer.providers';  
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from 'src/questions/questions.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [AnswerController],
  providers: [
     ...answerProviders, 
     ...questionProviders,
    AnswerService],
})
export class AnswerModule {}

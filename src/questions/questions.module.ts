import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionProviders } from './questions.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [...questionProviders,
    QuestionsService],
})
export class QuestionsModule {}

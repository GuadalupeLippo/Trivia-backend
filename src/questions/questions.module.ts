import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { questionProviders } from './questions.providers';
import { DatabaseModule } from 'src/database/database.module';
import { categoryProviders } from 'src/category/category.providers';
import { answerProviders } from 'src/answer/answer.providers';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionsController],
  providers: [...questionProviders,
    QuestionsService,
    ...categoryProviders,
  ...answerProviders,
CategoryService],
})
export class QuestionsModule {}

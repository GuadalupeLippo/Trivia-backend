import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { DatabaseModule } from 'src/database/database.module';
import { questionProviders } from 'src/questions/questions.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [
    ...categoryProviders,
    CategoryService,
  ...questionProviders],
})
export class CategoryModule {}

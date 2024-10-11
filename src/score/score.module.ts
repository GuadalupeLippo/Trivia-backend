import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { DatabaseModule } from 'src/database/database.module';
import { scoreProviders } from './score.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ScoreController],
  providers: [ScoreService,
    ...scoreProviders
  ],
})
export class ScoreModule {}

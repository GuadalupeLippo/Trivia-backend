import { Module } from '@nestjs/common';
import { BuyScoreService } from './buy-score.service';
import { BuyScoreController } from './buy-score.controller';

@Module({
  controllers: [BuyScoreController],
  providers: [BuyScoreService],
})
export class BuyScoreModule {}

import { Module } from '@nestjs/common';
import { BuyScoreService } from './buy-score.service';
import { BuyScoreController } from './buy-score.controller';
import { DatabaseModule } from 'src/database/database.module';
import { playerProviders } from 'src/player/player.providers';
import { scoreProviders } from 'src/score/score.providers';
import { buyScoreProviders } from './buy-score.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyScoreController],
  providers: [
    ...buyScoreProviders,
    ...playerProviders,
    ...scoreProviders,
    BuyScoreService],
})
export class BuyScoreModule {}

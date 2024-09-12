import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyScoreDto } from './create-buy-score.dto';

export class UpdateBuyScoreDto extends PartialType(CreateBuyScoreDto) {}

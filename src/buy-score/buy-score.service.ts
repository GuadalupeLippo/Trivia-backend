import { Injectable } from '@nestjs/common';
import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';

@Injectable()
export class BuyScoreService {
  create(createBuyScoreDto: CreateBuyScoreDto) {
    return 'This action adds a new buyScore';
  }

  findAll() {
    return `This action returns all buyScore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyScore`;
  }

  update(id: number, updateBuyScoreDto: UpdateBuyScoreDto) {
    return `This action updates a #${id} buyScore`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyScore`;
  }
}

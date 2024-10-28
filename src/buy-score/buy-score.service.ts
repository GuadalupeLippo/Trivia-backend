import { Injectable, Inject, NotFoundException} from '@nestjs/common';
import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';
import { BuyScore } from './entities/buy-score.entity';
import { Player } from 'src/player/entities/player.entity';
import { Score } from 'src/score/entities/score.entity';
import { Repository } from 'typeorm';
import { buyScoreRepository, playerRepository, scoreRepository} from 'src/constants/constant';

@Injectable()
export class BuyScoreService {
  constructor(
    @Inject(buyScoreRepository)
    private buyScoreRepository: Repository<BuyScore>,
    @Inject(scoreRepository)
    private scoreRepository: Repository<Score>,
    @Inject(playerRepository) 
    private playerRepository: Repository<Player>
  ) {}

  create(createBuyScoreDto: CreateBuyScoreDto) {
    return 'This action adds a new buyScore';
  }

 
    async findAll(): Promise<BuyScore[]> {
      const buyScore = await this.buyScoreRepository.find({ relations: ["score","player"] });
      if (!buyScore.length) throw new NotFoundException("No score purchased in database")
      return buyScore
  
  }
  

  findOne(id: number) {
    return `This action returns a #${id} buyScore`;
  }

  update(id: number, updateBuyScoreDto: UpdateBuyScoreDto) {
    return `This action updates a #${id} buyScore`;
  }

  async remove(id: number): Promise<void> {
    const buyScore = await this.buyScoreRepository.findOne({ where: { id } });
    if (!buyScore) {
      throw new NotFoundException(`BuyScore with ID ${id} not found`);
    }
    await this.buyScoreRepository.remove(buyScore);
  }
  
}

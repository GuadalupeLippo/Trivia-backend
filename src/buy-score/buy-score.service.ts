// import { Injectable, Inject, NotFoundException} from '@nestjs/common';
// import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
// import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';
// import { BuyScore } from './entities/buy-score.entity';
// import { Player } from 'src/player/entities/player.entity';
// import { Score } from 'src/score/entities/score.entity';
// import { Repository } from 'typeorm';
// import { buyScoreRepository, playerRepository, scoreRepository} from 'src/constants/constant';

// import { MercadoPagoConfig, Preference } from 'mercadopago';


// const client = new MercadoPagoConfig(
//   { accessToken: process.env.MP_ACCESS_TOKEN }
// );



// @Injectable()
// export class BuyScoreService {
//   constructor(
//     @Inject(buyScoreRepository)
//     private buyScoreRepository: Repository<BuyScore>,
//     @Inject(scoreRepository)
//     private scoreRepository: Repository<Score>,
//     @Inject(playerRepository) 
//     private playerRepository: Repository<Player>
//   ) {}

//   async createBuyScore(createBuyScoreDto: CreateBuyScoreDto): Promise<BuyScore> {
//     try {
//       const player = await this.playerRepository.findOne({ where: { id: createBuyScoreDto.playerId } });
//       if (!player) {
//         throw new NotFoundException('Player not found');
//       }

//       const score = await this.scoreRepository.findOne({ where: { id: createBuyScoreDto.scoreId } });
//       if (!score) {
//         throw new NotFoundException('Score not found');
//       }

//       const preference = new Preference();
//       preference.items = [
//         {
//           title: `Compra de ${score.points}`, 
//           quantity: 1,
//           unit_price: score.price,
//           currency_id: 'ARS', 
//         },
//       ];

//       // ir a la URL de pago
//       const preferenceResponse = await client.preference.create(preference);

//       const newBuyScore = this.buyScoreRepository.create({
//         score,
//         player,
//       });

//       await this.buyScoreRepository.save(newBuyScore);

//       return newBuyScore;
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

  
 
//     async findAll(): Promise<BuyScore[]> {
//       const buyScore = await this.buyScoreRepository.find({ relations: ["score","player"] });
//       if (!buyScore.length) throw new NotFoundException("No score purchased in database")
//       return buyScore
  
//   }
  
//   async findBuyScoreById(buyScoreId: number): Promise<BuyScore> {
//     try {
//     const buyScore = await this.buyScoreRepository.findOne({ where: { id: buyScoreId  },
//       relations:['score',
//         'player'
//       ] });
//     if (!buyScore) throw new NotFoundException("No purchase of point in database");
//       return buyScore
//     } catch {
//         throw new NotFoundException("No purchase of point in database")}
//   }

//   async updateOne(id: number, UpdateBuyScoreDto: UpdateBuyScoreDto): Promise<BuyScore> {
//     const { scoreId, playerId } = UpdateBuyScoreDto;
  
//     const buyScore = await this.buyScoreRepository.findOne({
//       where: { id },
//       relations: ["score", "player"],  
//     });
//     if (!buyScore) {
//       throw new NotFoundException(`BuyScore with ID ${id} not found`);
//     }
  
//     if (scoreId) {
//       const score = await this.scoreRepository.findOne({ where: { id: scoreId } });
//       if (!score) {
//         throw new NotFoundException(`Score with ID ${scoreId} not found`);
//       }
//       buyScore.score = score;
//     }
  
//     if (playerId) {
//       const player = await this.playerRepository.findOne({ where: { id: playerId } });
//       if (!player) {
//         throw new NotFoundException(`Player with ID ${playerId} not found`);
//       }
//       buyScore.player = player;
//     }
  
//     return await this.buyScoreRepository.save(buyScore);
//   }

//   async remove(id: number): Promise<void> {
//     const buyScore = await this.buyScoreRepository.findOne({ where: { id } });
//     if (!buyScore) {
//       throw new NotFoundException(`BuyScore with ID ${id} not found`);
//     }
//     await this.buyScoreRepository.remove(buyScore);
//   }
  
// }
  
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';
import { BuyScore } from './entities/buy-score.entity';
import { Player } from 'src/player/entities/player.entity';
import { Score } from 'src/score/entities/score.entity';
import { Repository } from 'typeorm';
import { buyScoreRepository, playerRepository, scoreRepository } from 'src/constants/constant';

import * as MercadoPago from 'mercadopago'; 

MercadoPago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

@Injectable()
export class BuyScoreService {
  constructor(
    @Inject(buyScoreRepository)
    private buyScoreRepository: Repository<BuyScore>,
    @Inject(scoreRepository)
    private scoreRepository: Repository<Score>,
    @Inject(playerRepository)
    private playerRepository: Repository<Player>,
  ) {}

  async createBuyScore(createBuyScoreDto: CreateBuyScoreDto): Promise<BuyScore> {
    try {
      const player = await this.playerRepository.findOne({ where: { id: createBuyScoreDto.playerId } });
      if (!player) {
        throw new NotFoundException('Player not found');
      }

      const score = await this.scoreRepository.findOne({ where: { id: createBuyScoreDto.scoreId } });
      if (!score) {
        throw new NotFoundException('Score not found');
      }

      const preference = {
        items: [
          {
            title: `Compra de ${score.points}`,
            quantity: 1,
            unit_price: score.price,
            currency_id: 'ARS',
          },
        ],
      };

      // Crea la preferencia en MercadoPago
      const preferenceResponse = await MercadoPago.preferences.create(preference);

      const newBuyScore = this.buyScoreRepository.create({
        score,
        player,
      });

      await this.buyScoreRepository.save(newBuyScore);

      // Devuelve la respuesta con el link de pago
      return newBuyScore;
      
    } catch (err) {
      console.error(err.message);
      throw new Error('Error creating buy score');
    }
  }

  async findAll(): Promise<BuyScore[]> {
    const buyScore = await this.buyScoreRepository.find({ relations: ['score', 'player'] });
    if (!buyScore.length) throw new NotFoundException('No score purchased in database');
    return buyScore;
  }

  async findBuyScoreById(buyScoreId: number): Promise<BuyScore> {
    const buyScore = await this.buyScoreRepository.findOne({
      where: { id: buyScoreId },
      relations: ['score', 'player'],
    });
    if (!buyScore) throw new NotFoundException('No purchase of point in database');
    return buyScore;
  }

  async updateOne(id: number, UpdateBuyScoreDto: UpdateBuyScoreDto): Promise<BuyScore> {
    const { scoreId, playerId } = UpdateBuyScoreDto;

    const buyScore = await this.buyScoreRepository.findOne({
      where: { id },
      relations: ['score', 'player'],
    });
    if (!buyScore) {
      throw new NotFoundException(`BuyScore with ID ${id} not found`);
    }

    if (scoreId) {
      const score = await this.scoreRepository.findOne({ where: { id: scoreId } });
      if (!score) {
        throw new NotFoundException(`Score with ID ${scoreId} not found`);
      }
      buyScore.score = score;
    }

    if (playerId) {
      const player = await this.playerRepository.findOne({ where: { id: playerId } });
      if (!player) {
        throw new NotFoundException(`Player with ID ${playerId} not found`);
      }
      buyScore.player = player;
    }

    return await this.buyScoreRepository.save(buyScore);
  }

  async remove(id: number): Promise<void> {
    const buyScore = await this.buyScoreRepository.findOne({ where: { id } });
    if (!buyScore) {
      throw new NotFoundException(`BuyScore with ID ${id} not found`);
    }
    await this.buyScoreRepository.remove(buyScore);
  }
}

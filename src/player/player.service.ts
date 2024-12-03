import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { gameRepository, playerRepository } from 'src/constants/constant';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(playerRepository)
    private playerRepository: Repository<Player>,
    @Inject(gameRepository)
    private gameRepository: Repository<Game>
  ) {}

  async findAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['user',
       'game',
      'buyAvatars.purchasedAvatar',
      'buyscore.score'
    ] }); 
  }



  async getAuthenticatedPlayer(playerId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['user',
        'game',
        'buyAvatars.purchasedAvatar',
        'buyscore.score'
      ],  
    });
    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }
  

  async updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto) : Promise<Player> {
    const player = await this.playerRepository.preload({
      id: id,
      ...updatePlayerDto
    })
    if (!player) throw new NotFoundException(`Player with id ${id} not found`)
  
    return await this.playerRepository.save(player)
  }

  async updateScore(playerId: number, points: number): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new Error('Jugador no encontrado');
    }
    player.score += points;
    return await this.playerRepository.save(player);
  }
  
  async deletePlayer(id: number): Promise <String> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) throw new NotFoundException(`player with id ${id} not found`);
    await this.playerRepository.remove(player)
    return 'player Deleted'}

    async addBonusPoints(playerId: number, bonusPoints: number): Promise<Player> {
      console.log("Puntos de bonificación:", bonusPoints);
      const player = await this.playerRepository.findOne(
        { where: { id: playerId }}
      );
      if (!player) {
        throw new Error('Player not found');
      }
      player.score += bonusPoints;
      console.log("Nuevo puntaje:", player.score);   

      const savedPlayer = await this.playerRepository.save(player);
     
      return savedPlayer
      }
      
      async getTopThreeGames(playerId: number) {
        const topGames = await this.gameRepository
          .createQueryBuilder('game')
          .leftJoinAndSelect('game.category', 'category')
          .where('game.playerId = :playerId', { playerId })
          .orderBy('game.totalScore', 'DESC')
          .take(3)
          .getMany();
        return topGames;
    }
    


      
    }
  


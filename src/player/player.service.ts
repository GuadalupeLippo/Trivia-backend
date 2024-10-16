import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { playerRepository } from 'src/constants/constant';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(playerRepository)
    private playerRepository: Repository<Player>,
  ) {}

  async findAllPlayers(): Promise<Player[]> {
    return this.playerRepository.find({ relations: ['user'] }); 
  }



  async getAuthenticatedPlayer(playerId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['user'],  // Carga también los datos del usuario relacionados
    });
    if (!player) {
      throw new NotFoundException('Player not found');
    }

    return player;
  }
  

  updatePlayer(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  async deletePlayer(id: number): Promise <String> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) throw new NotFoundException(`player with id ${id} not found`);
    await this.playerRepository.remove(player)
    return 'player Deleted'}
}

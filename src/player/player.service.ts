import { Inject, Injectable } from '@nestjs/common';
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



  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}

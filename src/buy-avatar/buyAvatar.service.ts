import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateBuyAvatarDto } from './dto/create-buyAvatar.dto';
import { UpdateBuyAvatarDto } from './dto/update-buyAvatar.dto';
import { BuyAvatar } from './entities/buyAvatar.entity';
import { Avatar } from 'src/avatars/entities/avatar.entity';
import { Player } from 'src/player/entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuyAvatarService {
  constructor(
    @Inject('AVATAR_REPOSITORY')
    private avatarRepository: Repository<Avatar>,
    @Inject('BUYAVATAR_REPOSITORY')
    private buyAvatarRepository: Repository<BuyAvatar>,
    @Inject('PLAYER_REPOSITORY') 
    private playerRepository: Repository<Player>
  ) {}

  async findAll(): Promise<BuyAvatar[]> {
    const buyAvatar = await this.buyAvatarRepository.find({ relations: ["purchasedAvatar","player"] });
    if (!buyAvatar.length) throw new NotFoundException("No purchases in database")
    return buyAvatar

}

async createOne(createBuyAvatarDto: CreateBuyAvatarDto): Promise<BuyAvatar> {
  const { avatarId, playerId } = createBuyAvatarDto;

  const avatar = await this.avatarRepository.findOne({ where: { id: avatarId } });
  if (!avatar) {
    throw new NotFoundException(`Avatar with ID ${avatarId} not found`);
  }

  const player = await this.playerRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }

  const buyAvatar = new BuyAvatar();
  buyAvatar.purchasedAvatar = avatar;
  buyAvatar.player = player;  
  return await this.buyAvatarRepository.save(buyAvatar);
}

async updateOne(id: number, updateBuyAvatarDto: UpdateBuyAvatarDto): Promise<BuyAvatar> {
  const { avatarId, playerId } = updateBuyAvatarDto;

  const buyAvatar = await this.buyAvatarRepository.findOne({
    where: { id },
    relations: ["purchasedAvatar", "player"],  
  });
  if (!buyAvatar) {
    throw new NotFoundException(`BuyAvatar with ID ${id} not found`);
  }

  if (avatarId) {
    const avatar = await this.avatarRepository.findOne({ where: { id: avatarId } });
    if (!avatar) {
      throw new NotFoundException(`Avatar with ID ${avatarId} not found`);
    }
    buyAvatar.purchasedAvatar = avatar;
  }

  if (playerId) {
    const player = await this.playerRepository.findOne({ where: { id: playerId } });
    if (!player) {
      throw new NotFoundException(`Player with ID ${playerId} not found`);
    }
    buyAvatar.player = player;
  }

  return await this.buyAvatarRepository.save(buyAvatar);
}

async deleteOne(id: number): Promise<void> {
  const buyAvatar = await this.buyAvatarRepository.findOne({ where: { id } });
  if (!buyAvatar) {
    throw new NotFoundException(`BuyAvatar with ID ${id} not found`);
  }

  await this.buyAvatarRepository.remove(buyAvatar);
}

}

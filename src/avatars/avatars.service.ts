import { Inject, Injectable , NotFoundException} from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Avatar } from './entities/avatar.entity';
import { Repository } from 'typeorm';
import { avatarRepository } from 'src/constants/constant';

@Injectable()
export class AvatarsService {
  constructor(
    @Inject(avatarRepository)
    private avatarRepository: Repository<Avatar>,
  ){}

  async createOne(createAvatarDto: CreateAvatarDto): Promise<Avatar> {
    const avatar = this.avatarRepository.create(createAvatarDto)
    return this.avatarRepository.save(avatar)
  }

  async findOneAvatar(avatarId: number): Promise<Avatar> {
    try {
    const avatar = await this.avatarRepository.findOne({ where: { id: avatarId  },
      relations:['purchasedAvatars',
        'purchasedAvatars.player'
      ] });
    if (!avatar) throw new NotFoundException("No avatar in database");
      return avatar
    } catch {
        throw new NotFoundException("No avatar in database")}
  }
  
  async findAll(): Promise<Avatar[]> {
    const avatars = await this.avatarRepository.find()
    if (!avatars.length) throw new NotFoundException("No avatars in database")
    return avatars
  }

  async update(id: number, updateAvatarDto: UpdateAvatarDto) {
    const avatar = await this.avatarRepository.preload({
      id: id,
      ...updateAvatarDto
    })
    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`)
    return await this.avatarRepository.save(avatar)
  }

  async remove(id: number): Promise<void> {
    const avatar = await this.avatarRepository.findOne({ where: { id } });
    if (!avatar) throw new NotFoundException(`Avatar with id ${id} not found`);
    await this.avatarRepository.remove(avatar);
  }
  
}



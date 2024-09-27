import { Injectable, Inject, NotFoundException} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { userRepository } from 'src/constants/constant';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject(userRepository)
    private userRepository: Repository<User>,
  ) {}

   
  async findAllUsers(): Promise<User[]> {
    const user = await this.userRepository.find()
    if (!user.length) throw new NotFoundException("No user in database")
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

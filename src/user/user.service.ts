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
    if (!user) throw new NotFoundException("No user in database")
    return user
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })
    if (!user) throw new NotFoundException(`User with id ${id} not found`)
    return await this.userRepository.save(user)
  }

  async removeUser(id: number): Promise<String> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    await this.userRepository.remove(user);
    return `User with ${id} deleted`
  }
  
}

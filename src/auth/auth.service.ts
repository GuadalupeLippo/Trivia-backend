import { Injectable,
Inject,
BadRequestException,
UnauthorizedException
 } from '@nestjs/common';
 import { User } from 'src/user/entities/user.entity';
 import { playerRepository, userRepository } from 'src/constants/constant';
 import {Repository} from 'typeorm'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashService } from './hash/hash.service';
import { LoginDto } from './dto/login.dto';
import { Player } from 'src/player/entities/player.entity';
import { CreatePlayerDto } from 'src/player/dto/create-player.dto';

@Injectable()
export class AuthService {
    @Inject(userRepository)
    private userRepository : Repository<User>;
    @Inject(playerRepository)
    private playerRepository : Repository<Player>;
    constructor (private readonly hashService : HashService) {};


    async register(createUserDto : CreateUserDto) {
        const securePassword = await this.hashService.hashPassword(createUserDto.password)
        try {
            const newUser = this.userRepository.create({
                ...createUserDto,
                password : securePassword
            });
            await this.userRepository.save(newUser)

            const newPlayer = this.playerRepository.create({
                user: newUser,
                ...CreatePlayerDto
            });
            await this.playerRepository.save(newPlayer);
            

            const {password, id, ...rest} = newUser;
            return rest;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async login(loginDto: LoginDto) : Promise <Partial<Player> & Partial<User>> {
        
        const player = await this.playerRepository.findOne({
            where: {
                user: {
                    email: loginDto.email,
                },
            },
            relations: ['user'], 
        });
        if(!player) throw new UnauthorizedException('Invalid Email');

        const isAuthenticated = await this.hashService.comparePassword(loginDto.password,player.user.password);
        if(!isAuthenticated) throw new UnauthorizedException('Invalid password');

        const { user, ...playerData } = player;
        const { password, ...userData } = user;
    
       
        return {
            ...playerData, 
            ... userData  
        };
    }

}

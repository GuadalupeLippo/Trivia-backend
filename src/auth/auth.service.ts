import { Injectable,
Inject,
BadRequestException,
UnauthorizedException
 } from '@nestjs/common';
 import { User } from 'src/user/entities/user.entity';
 import { userRepository } from 'src/constants/constant';
 import {Repository} from 'typeorm'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HashService } from './hash/hash.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    @Inject(userRepository)
    private userRepository : Repository<User>;
    constructor (private readonly hashServise : HashService) {};


    async register(createUserDto : CreateUserDto) {
        const securePassword = await this.hashServise.hashPassword(createUserDto.password)
        try {
            const newUser = this.userRepository.create({
                ...createUserDto,
                password : securePassword
            });
            await this.userRepository.save(newUser)
            const {password, id, ...rest} = newUser;
            return rest;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async login(loginDto: LoginDto) : Promise <Partial<User>> {
        const user = await this.userRepository.findOneBy({
            email : loginDto.email
           
        });
        if(!user) throw new UnauthorizedException('Invalid Email or Password');
        const isAuthenticated = await this.hashServise.comparePassword(loginDto.password,user.password);
        if(!isAuthenticated) throw new UnauthorizedException('Invalid password');

        const{password, id, ...rest} = user

        return rest
    }

}

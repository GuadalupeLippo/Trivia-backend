import { Controller,
     Body, 
    Post,
    HttpStatus,
    HttpCode} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async loguin (@Body() loginDto : LoginDto) {
        return this.authService.login(loginDto)
    }
  
}

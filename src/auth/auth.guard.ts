import {
    CanActivate, 
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService,
        private readonly configService:ConfigService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException ('Token no encontrado')
        }
        try{
            const secret = this.configService.get<string>('JWT_SECRET');
            const payload = await this.jwtService.verifyAsync(token,{
                secret: secret
            })
            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException()
        }
        return true
    }


    private extractTokenFromHeader(request: Request) : string | undefined {
        const [type, token ] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined

    }
}
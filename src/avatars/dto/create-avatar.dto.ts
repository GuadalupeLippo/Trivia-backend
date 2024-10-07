import { IsString, IsInt, Length, IsEnum } from 'class-validator';
import { AvatarType } from '../entities/avatar.entity'; 

export class CreateAvatarDto {

    @IsString()
    @Length(1, 500)
    image: string;

    @IsInt()
    price: number;

    @IsEnum(AvatarType, { message: 'Type must be either normal or premium' })
    type: AvatarType;
}

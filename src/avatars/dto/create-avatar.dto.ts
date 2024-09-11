import { IsString, IsInt, Length } from 'class-validator';
export class CreateAvatarDto {

    @IsString()
    @Length(1, 500)
    image: string;

    @IsInt()
    price: number;
}

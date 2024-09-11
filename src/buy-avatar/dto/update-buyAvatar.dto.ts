import { PartialType } from '@nestjs/mapped-types';
import { CreateBuyAvatarDto } from './create-buyAvatar.dto';

export class UpdateBuyAvatarDto extends PartialType(CreateBuyAvatarDto) {}

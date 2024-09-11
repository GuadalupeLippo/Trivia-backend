import { Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { BuyAvatarService } from './buyAvatar.service';
import { CreateBuyAvatarDto } from './dto/create-buyAvatar.dto';
import { UpdateBuyAvatarDto } from './dto/update-buyAvatar.dto';

@Controller('buy-avatar')
export class BuyAvatarController {
  constructor(private readonly buyAvatarService: BuyAvatarService) {}

  @Post()
  create(@Body() createBuyAvatarDto: CreateBuyAvatarDto) {
    return this.buyAvatarService.createOne(createBuyAvatarDto);
  }

  @Get()
  findAll() {
    return this.buyAvatarService.findAll();
  }

  @Put(':id')
  async update( @Param('id') id: number, @Body() updateBuyAvatarDto: UpdateBuyAvatarDto){
    return this.buyAvatarService.updateOne(id, updateBuyAvatarDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.buyAvatarService.deleteOne(id);
  }
}

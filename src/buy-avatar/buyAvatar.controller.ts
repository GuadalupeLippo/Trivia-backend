import { Controller, Get, Post, Body, Param, Put, Delete,ConflictException, ParseIntPipe} from '@nestjs/common';
import { BuyAvatarService } from './buyAvatar.service';
import { CreateBuyAvatarDto } from './dto/create-buyAvatar.dto';
import { UpdateBuyAvatarDto } from './dto/update-buyAvatar.dto';

@Controller('buy-avatar')
export class BuyAvatarController {
  constructor(private readonly buyAvatarService: BuyAvatarService) {}

@Post()
async create(@Body() createBuyAvatarDto: CreateBuyAvatarDto) {
  try {
    return await this.buyAvatarService.createOne(createBuyAvatarDto);
  } catch (error) {
    if (error instanceof ConflictException) {
      throw new ConflictException(error.message);
    }
    throw error;
  }
}


  @Get()
  findAll() {
    return this.buyAvatarService.findAll();
  }

  @Get('user/:userId')
findByUserId(@Param('userId', ParseIntPipe) userId: number) {
  return this.buyAvatarService.findByUserId(userId);
}

  @Get(':id')
  findBuyAvatarById(@Param('id',ParseIntPipe) id: number) {
    return this.buyAvatarService.findBuyAvatarById(id);
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

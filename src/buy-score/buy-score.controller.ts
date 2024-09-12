import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyScoreService } from './buy-score.service';
import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';

@Controller('buy-score')
export class BuyScoreController {
  constructor(private readonly buyScoreService: BuyScoreService) {}

  @Post()
  create(@Body() createBuyScoreDto: CreateBuyScoreDto) {
    return this.buyScoreService.create(createBuyScoreDto);
  }

  @Get()
  findAll() {
    return this.buyScoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyScoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyScoreDto: UpdateBuyScoreDto) {
    return this.buyScoreService.update(+id, updateBuyScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyScoreService.remove(+id);
  }
}

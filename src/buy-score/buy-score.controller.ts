import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyScoreService } from './buy-score.service';
import { CreateBuyScoreDto } from './dto/create-buy-score.dto';
import { UpdateBuyScoreDto } from './dto/update-buy-score.dto';

@Controller('buy-score')
export class BuyScoreController {
  constructor(private readonly buyScoreService: BuyScoreService) {}

  @Post()
  async create(@Body() createBuyScoreDto: CreateBuyScoreDto) {
    return await this.buyScoreService.createBuyScore(createBuyScoreDto);
  }

  @Get()
  async findAll() {
    return await this.buyScoreService.findAll();
  }

  @Get(':id')
  async findBuyScoreById(@Param('id') id: number) {
    return await this.buyScoreService.findBuyScoreById(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBuyScoreDto: UpdateBuyScoreDto) {
    return await this.buyScoreService.updateOne(+id, updateBuyScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.buyScoreService.remove(+id);
  }
}

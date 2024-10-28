import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Controller('/avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post()
  async create(@Body() createAvatarDto: CreateAvatarDto) {
    return await this.avatarsService.createOne(createAvatarDto);
  }

  @Get(':id')
  async findOneAvatar(@Param('id', ParseIntPipe) id: number) {
    return await this.avatarsService.findOneAvatar(id);
  }

  @Get()
  async findAll() {
    return await this.avatarsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateAvatarDto: UpdateAvatarDto) {
    return await this.avatarsService.update(+id, updateAvatarDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return await this.avatarsService.remove(+id);
  }
}


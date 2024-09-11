import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';

@Controller('/avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Post()
  create(@Body() createAvatarDto: CreateAvatarDto) {
    return this.avatarsService.createOne(createAvatarDto);
  }

  @Get()
  findAll() {
    return this.avatarsService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAvatarDto: UpdateAvatarDto) {
    return this.avatarsService.update(+id, updateAvatarDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.avatarsService.remove(+id);
  }
}


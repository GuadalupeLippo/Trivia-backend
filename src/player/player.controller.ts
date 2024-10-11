import { Controller, 
  Get,
  Body,
  Patch, 
  Param, 
  Delete, 
  UseGuards, Req } from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { request } from 'http';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}


  @UseGuards(AuthGuard)
  @Get('profile') 
  async getAuthenticatedPlayer(@Req() request: any) {
    const playerId = request.user.sub 
    return this.playerService.FindPlayerById(playerId);
  } 


  @UseGuards(AuthGuard)
  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playerService.findAllPlayers();
  }

  @Patch(':id')
  updatePlayer(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.updatePlayer(+id, updatePlayerDto);
  }

  @Delete(':id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(+id);
  }
}

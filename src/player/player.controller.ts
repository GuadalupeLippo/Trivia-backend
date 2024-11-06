import { Controller, 
  Get,
  Body,
  Patch, 
  Param,
  Post, 
  Delete, 
  UseGuards, Req, 
  Request} from '@nestjs/common';
import { PlayerService } from './player.service';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getAuthenticatedPlayer(@Req() request: any) {
    const playerId = request.user.sub; // Esto asume que el ID está en el campo 'sub'
    return await this.playerService.getAuthenticatedPlayer(playerId);

  }

  @UseGuards(AuthGuard)
  @Post('bonus')
  async addBonusPoints(@Request() req: any, @Body() body: { bonusPoints: number }) {
    const playerId = req.user.sub;
    const updatedPlayer = await this.playerService.addBonusPoints(playerId, body.bonusPoints);
    return updatedPlayer; // Devolver el jugador actualizado
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playerService.findAllPlayers();
  }

  @Patch(':id')
  async updatePlayer(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playerService.updatePlayer(+id, updatePlayerDto);
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string) {
    return await this.playerService.deletePlayer(+id);
  }
  
}

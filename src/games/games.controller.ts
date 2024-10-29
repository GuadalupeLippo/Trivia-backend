import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Controller('games')
export class GamesController {
  
  constructor(private readonly gamesService: GamesService) {}

 
  @Get()
  findAllGames() {
    return this.gamesService.findAllGames();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Post('/trivia-categoria')
  async createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
  }
  @Post('/trivia-random')
  async createRandomGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createRandomGame(createGameDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @Delete(':id')
  removeGames(@Param('id') id: string) {
    return this.gamesService.removeGames(+id);
  }
}

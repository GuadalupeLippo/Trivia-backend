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
  async findOneGame(@Param('id') id: number) {
    return await this.gamesService.findOneGame(+id);
  }
  @Post('/trivia-categoria')
  async createGame(@Body() createGameDto: CreateGameDto) {
    const game=  this.gamesService.createGame(createGameDto);
    return {
      id: (await game).id,
      category: (await game).category,
      difficulty: (await game).difficulty,
      questions: (await game).questions,
      player: {
          id: (await game).player.id,
          score: (await game).player.score 
      }
  };
  }

  @Post('/trivia-random')
  async createRandomGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createRandomGame(createGameDto);
  }

  @Patch(':id/total-score')
  async updateTotalScoreAndAnsweredQuestions(
    @Param('id') gameId: number, 
    @Body() updateScoreDto: { totalScore: number,  answeredQuestionsIds: number[] }
  ) {
    const { totalScore, answeredQuestionsIds} = updateScoreDto;
    return await this.gamesService.updateTotalScoreAndAnsweredQuestions(gameId,totalScore,answeredQuestionsIds);
  }

  @Delete(':id')
  async removeGames(@Param('id') id: string) {
    return await this.gamesService.removeGames(+id);
  }
}

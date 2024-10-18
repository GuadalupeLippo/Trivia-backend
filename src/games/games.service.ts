import { Injectable, Inject } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Category } from 'src/category/entities/category.entity';
import { Player } from 'src/player/entities/player.entity';
import { Difficulty}  from 'src/difficulty/entities/difficulty.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { answerRepository, categoryRepository, difficultyRepository, gameRepository } from 'src/constants/constant';
import { playerRepository } from 'src/constants/constant';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  @Inject(gameRepository)
  private gameRepository : Repository<Game>;
  @Inject(playerRepository)
  private playerRepository : Repository<Player>;
  @Inject(categoryRepository)
  private categoryRepository : Repository<Category>;
  @Inject(difficultyRepository)
  private difficultyRepository : Repository<Difficulty>;
  @Inject(answerRepository)
  private answerRepository : Repository<Answer>;
 

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const player = await this.playerRepository.findOne({ where: { id: createGameDto.playerId } });
    const category = await this.categoryRepository.findOne({ where: { id: createGameDto.categoryId } });
    const difficulty = await this.difficultyRepository.findOne({ where: { id: createGameDto.difficultyId } });
    const answer = await this.answerRepository.findOne({ where: { id: createGameDto.answerId } });
  


    if (!player || !category || !difficulty || !answer) {
      throw new Error('Player, Category, Difficulty or answer not found');
    }

    const game = this.gameRepository.create({
      player,
      category,
      difficulty,
    });

    return await this.gameRepository.save(game);
  }
  
  async findAllGames(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['player',
      'answer',
      'category',
      'difficulty',] }); 
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}

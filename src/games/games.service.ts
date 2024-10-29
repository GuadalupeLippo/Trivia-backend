import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Category } from 'src/category/entities/category.entity';
import { Player } from 'src/player/entities/player.entity';
import { Difficulty}  from 'src/difficulty/entities/difficulty.entity';
import {categoryRepository,
  difficultyRepository, 
  gameRepository,
  questionRepository } from 'src/constants/constant';
import { playerRepository } from 'src/constants/constant';
import { Repository, In } from 'typeorm';
import { Game } from './entities/game.entity';
import { Question } from 'src/questions/entities/question.entity';
import { CategoryService} from 'src/category/category.service';
import { QuestionsService } from 'src/questions/questions.service';


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
  @Inject(questionRepository)
  private questionRepository : Repository<Question>;
  constructor(private readonly categoryService: CategoryService,
    private readonly questionService : QuestionsService
  ) {};


  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const player = await this.playerRepository.findOne({ where: { id: createGameDto.playerId } });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    const category = await this.categoryService.getCategoryByIdWithQuestionRandom(createGameDto.categoryId)
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const difficulty = await this.difficultyRepository.findOne({ where: { id: createGameDto.difficultyId } });
    if (!category) {
      throw new NotFoundException('Difficulty not found');
    }

    const questions = category.question;

    if (!questions) {
      throw new NotFoundException('Question not found');
    }

    const game = this.gameRepository.create({
      player,
      category,
      difficulty,
      questions
     
    });

    return await this.gameRepository.save(game);
  }


  
  async createRandomGame(createGameDto: CreateGameDto): Promise<Game> {
    const player = await this.playerRepository.findOne({ where: { id: createGameDto.playerId } });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
 
    const difficulty = await this.difficultyRepository.findOne({ where: { id: createGameDto.difficultyId } });
    if (!difficulty) {
      throw new NotFoundException('Difficulty not found');
    }

    const questionsRandom = await this.questionService.getRandomQuestions()

    if (!questionsRandom) {
      throw new NotFoundException('Questions not found');
    }

    const newRandomGame = this.gameRepository.create({
      player,
      difficulty,
      questions: questionsRandom
     
    });

    return await this.gameRepository.save(newRandomGame);
  }



  async findAllGames(): Promise<Game[]> {
    const games = await this.gameRepository.find({ relations: ['player',
      'category',
      'difficulty',
    'category.question',
    'category.question.answers'] }); 
    return games
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  async removeGames(id: number): Promise<String> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);
    await this.gameRepository.remove(game);
    return `Game with ${id} deleted`;
  }
  
}

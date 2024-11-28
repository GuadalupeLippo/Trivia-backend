import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Category } from 'src/category/entities/category.entity';
import { Player } from 'src/player/entities/player.entity';
import { Difficulty}  from 'src/difficulty/entities/difficulty.entity';
import {categoryRepository,
  dataSource,
  difficultyRepository, 
  gameRepository,
  questionRepository } from 'src/constants/constant';
import { playerRepository } from 'src/constants/constant';
import { Repository, In, DataSource, QueryRunner } from 'typeorm';
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
  @Inject (dataSource)
  private readonly dataSource: DataSource
  constructor(
    private readonly categoryService: CategoryService,
    private readonly questionService : QuestionsService,
  ) {};


  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [player, category, difficulty] = await Promise.all([
        queryRunner.manager.findOne(Player, { where: { id: createGameDto.playerId } }),
        this.categoryService.getCategoryByIdWithQuestionRandom(createGameDto.categoryId),
        queryRunner.manager.findOne(Difficulty, { where: { id: createGameDto.difficultyId } }),
      ]);

      if (!player) throw new NotFoundException('Player not found');
      if (!category) throw new NotFoundException('Category not found');
      if (!difficulty) throw new NotFoundException('Difficulty not found');

      const questions = category.question;

      if (!questions || questions.length === 0) {
        throw new NotFoundException('Question not found');
      }

      const game = queryRunner.manager.create(Game, {
        player,
        category,
        difficulty,
        questions,
      });

      const savedGame = await queryRunner.manager.save(game);

      await queryRunner.commitTransaction();
      return savedGame;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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

  async findOneGame(gameId: number): Promise<Game> {
    try {
    const game = await this.gameRepository.findOne(
      {where: { id: gameId  }}
    )
    if (!game) throw new NotFoundException("No game in database");
      return game
    } catch {
        throw new NotFoundException("No game in database")}
  }

  async updateTotalScoreAndAnsweredQuestions(gameId: number, totalScore: number,  answeredQuestionsIds: number[]): Promise<Game> {
    try {
      const game = await this.gameRepository.findOne(
        {where: { id: gameId  },
        relations: ['questions']
      });
      
      
      if (!Array.isArray(answeredQuestionsIds)) {
        return;
      }

      if (!game.questions || game.questions.length === 0) {
        game.totalScore = totalScore;
        return await this.gameRepository.save(game);
      }
  

      const answeredQuestions = game.questions.filter(question => 
        question.id && answeredQuestionsIds && answeredQuestionsIds.includes(question.id)
      );

      if (answeredQuestions.length === 0) {
        throw new BadRequestException('No valid answered questions found.')
      }
      
      game.questions = answeredQuestions;
      game.totalScore = totalScore;
  
  
      return await this.gameRepository.save(game);
    } catch (error) {

      console.error("Error al actualizar el puntaje total:", error);
      throw new NotFoundException("No game in database");
    }
  }

  async removeGames(id: number): Promise<String> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) throw new NotFoundException(`Game with id ${id} not found`);
    await this.gameRepository.remove(game);
    return `Game with ${id} deleted`;
  }
  
}

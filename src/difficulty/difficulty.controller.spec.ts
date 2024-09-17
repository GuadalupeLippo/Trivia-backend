import { Test, TestingModule } from '@nestjs/testing';
import { difficultyController } from './difficulty.controller';
import { DifficultyService } from './difficulty.service';

describe('Difficulty', () => {
  let controller: difficultyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [difficultyController],
      providers: [DifficultyService],
    }).compile();

    controller = module.get<difficultyController>(difficultyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DifficultyService } from './tipo-dificult.service';

describe('TipoDificultService', () => {
  let service: DifficultyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifficultyService],
    }).compile();

    service = module.get<DifficultyService>(DifficultyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

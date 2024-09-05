import { Test, TestingModule } from '@nestjs/testing';
import { TipoDificultService } from './tipo-dificult.service';

describe('TipoDificultService', () => {
  let service: TipoDificultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoDificultService],
    }).compile();

    service = module.get<TipoDificultService>(TipoDificultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

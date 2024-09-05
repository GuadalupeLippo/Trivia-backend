import { Test, TestingModule } from '@nestjs/testing';
import { TipoDificultController } from './tipo-dificult.controller';
import { TipoDificultService } from './tipo-dificult.service';

describe('TipoDificultController', () => {
  let controller: TipoDificultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoDificultController],
      providers: [TipoDificultService],
    }).compile();

    controller = module.get<TipoDificultController>(TipoDificultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

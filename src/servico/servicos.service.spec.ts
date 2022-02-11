import { Test, TestingModule } from '@nestjs/testing';
import { ServicoService } from './servicos.service';

describe('ServicosService', () => {
  let service: ServicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServicoService],
    }).compile();

    service = module.get<ServicoService>(ServicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

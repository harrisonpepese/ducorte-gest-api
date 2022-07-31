import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
export class RelatorioController {
  constructor(private service: RelatorioService) {}

  @Get('/dashboard')
  async dashboard(): Promise<any> {
    return this.service.dashboard(new Date());
  }
}

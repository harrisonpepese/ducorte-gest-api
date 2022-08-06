import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RelatorioService } from './relatorio.service';

@Controller('relatorio')
@UseGuards(JwtAuthGuard)
export class RelatorioController {
  constructor(private service: RelatorioService) {}

  @Get('/dashboard')
  async dashboard(): Promise<any> {
    return this.service.dashboard(new Date());
  }
  @Get('/cliente/:id')
  async clienteDetails(@Param('id') id: string): Promise<any> {
    return this.service.clienteStatics(id);
  }
  @Get('/funcionario/:id')
  async funcionarioDetails(@Param('id') id: string): Promise<any> {
    return this.service.funcionarioStatics(id);
  }
  @Get('/servicos/:id')
  async servicosDetails(@Param('id') id: string): Promise<any> {
    return this.service.servicoStatics(id);
  }
}

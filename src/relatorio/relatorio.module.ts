import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Atendimento,
  AtendimentoSchema,
} from 'src/atendimento/atendimento.entity';
import { Cliente, ClienteSchema } from 'src/cliente/cliente.entity';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
    MongooseModule.forFeature([
      { name: Atendimento.name, schema: AtendimentoSchema },
    ]),
  ],
  controllers: [RelatorioController],
  providers: [RelatorioService],
})
export class RelatorioModule {}

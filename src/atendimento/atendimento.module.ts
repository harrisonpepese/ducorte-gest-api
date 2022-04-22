import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AtendimentoController } from './atendimento.controller';
import { AtendimentoService } from './atendimento.service';
import { Atendimento, AtendimentoSchema } from './atendimento.entity';
import { AtendimentoProfile } from './atendimento.profile';
import { Cliente, ClienteSchema } from 'src/cliente/cliente.entity';
import {
  Funcionario,
  FuncionarioSchema,
} from 'src/funcionario/funcionario.entity';
import { Servico, ServicoSchema } from 'src/servico/servico.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Atendimento.name, schema: AtendimentoSchema },
    ]),
  ],
  controllers: [AtendimentoController],
  providers: [AtendimentoProfile, AtendimentoService],
})
export class AtendimentoModule {}

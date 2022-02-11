import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { Agendamento, AgendamentoSchema } from './schema/agendamento.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Agendamento.name,schema:AgendamentoSchema}])],
  controllers: [AgendamentoController],
  providers: [AgendamentoService]
})
export class AgendamentoModule {}

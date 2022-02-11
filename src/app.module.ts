import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteService } from './cliente/cliente.service';
import { ClienteModule } from './cliente/cliente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AgendamentoModule } from './agendamento/agendamento.module';
import { ServicoModule } from './servico/servico.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),ClienteModule, FuncionarioModule, AgendamentoModule, ServicoModule, AuthModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

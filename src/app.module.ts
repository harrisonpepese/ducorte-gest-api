import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AgendamentoModule } from './atendimento/atendimento.module';
import { ServicoModule } from './servico/servico.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';


@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot("mongodb+srv://PbotApp:17yxzl2mSmE9GVDJ@cluster0.lchwd.mongodb.net/Pbot?retryWrites=true&w=majority"),ClienteModule, FuncionarioModule, AgendamentoModule, ServicoModule, AuthModule, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { ServicoModule } from './servico/servico.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RelatorioModule } from './relatorio/relatorio.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://PbotApp:17yxzl2mSmE9GVDJ@cluster0.lchwd.mongodb.net/Pbot?retryWrites=true&w=majority',
    ),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ClienteModule,
    FuncionarioModule,
    AtendimentoModule,
    ServicoModule,
    AuthModule,
    UsuarioModule,
    RelatorioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

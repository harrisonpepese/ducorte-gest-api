import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { Funcionario, FuncionarioSchema } from './schema/funcionarioSchema';

@Module({
  imports:[MongooseModule.forFeature([{name:Funcionario.name,schema:FuncionarioSchema}])],
  controllers: [FuncionarioController],
  providers: [FuncionarioService]
})
export class FuncionarioModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { Funcionario, FuncionarioSchema } from './funcionario.entity';
import { FuncionarioProfile } from './funcionario.profile';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[MongooseModule.forFeature([{name:Funcionario.name,schema:FuncionarioSchema}])],
  controllers: [FuncionarioController],
  providers: [FuncionarioProfile, FuncionarioService]
})
export class FuncionarioModule {}

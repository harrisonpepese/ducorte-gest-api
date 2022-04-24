import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Servico, ServicoSchema } from './servico.entity';
import { ServicoController } from './servico.controller';
import { ServicoProfile } from './servico.profile';
import { ServicoService } from './servicos.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[MongooseModule.forFeature([{name:Servico.name,schema:ServicoSchema}])],
  controllers: [ServicoController],
  providers: [ServicoProfile,ServicoService]
})
export class ServicoModule {}

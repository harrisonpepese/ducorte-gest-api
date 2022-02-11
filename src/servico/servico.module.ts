import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Servico, ServicoSchema } from './schema/servico.schema';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servicos.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Servico.name,schema:ServicoSchema}])],
  controllers: [ServicoController],
  providers: [ServicoService]
})
export class ServicoModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Servico, ServicoSchema } from './schema/servico.schema';
import { ServicosController } from './servicos.controller';
import { ServicosService } from './servicos.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Servico.name,schema:ServicoSchema}])],
  controllers: [ServicosController],
  providers: [ServicosService]
})
export class ServicosModule {}

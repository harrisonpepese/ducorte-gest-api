import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from 'src/cliente/schema/cliente.schema';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Cliente.name,schema:ClienteSchema}])],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}

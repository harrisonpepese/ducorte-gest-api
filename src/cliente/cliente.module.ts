import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cliente, ClienteSchema } from 'src/cliente/cliente.entity';
import { ClienteController } from './cliente.controller';
import { ClienteProfile } from './cliente.profile';
import { ClienteService } from './cliente.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cliente.name, schema: ClienteSchema }]),
  ],
  controllers: [ClienteController],
  providers: [ClienteProfile, ClienteService],
})
export class ClienteModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
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

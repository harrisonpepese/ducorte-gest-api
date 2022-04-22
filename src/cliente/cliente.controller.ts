import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';

import IListDtoController from 'src/interfaces/controller/ilistdto.controller';
import { ListDto } from 'src/interfaces/list.dto';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './cliente.dto';
import { Cliente } from './cliente.entity';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { addProfile, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ClienteProfile } from './cliente.profile';

@Controller('cliente')
export class ClienteController implements ICrudController<Cliente, ClienteDto> {
  constructor(
    private readonly clienteService: ClienteService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly clienteProfile : ClienteProfile,
  ) {
    addProfile(mapper, clienteProfile.profile);
  }
  @Get()
  async find(): Promise<ClienteDto[]> {
    const reponse = await this.clienteService.find();
    return reponse.map((x) => this.mapper.map(x, Cliente, ClienteDto));
  }
  getOne(id: string): Promise<ClienteDto> {
    throw new Error('Method not implemented.');
  }
  create(dto: ClienteDto): Promise<ClienteDto> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: ClienteDto): Promise<ClienteDto> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

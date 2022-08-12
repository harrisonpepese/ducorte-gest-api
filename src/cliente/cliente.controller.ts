import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { ClienteDto } from './cliente.dto';
import { Cliente } from './cliente.entity';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { addProfile, Mapper } from '@automapper/core';
import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { ClienteProfile } from './cliente.profile';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('cliente')
@UseGuards(JwtAuthGuard)
export class ClienteController implements ICrudController<Cliente, ClienteDto> {
  constructor(
    private readonly clienteService: ClienteService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly clienteProfile: ClienteProfile,
  ) {
    addProfile(mapper, clienteProfile.profile);
  }
  @Get()
  async find(): Promise<ClienteDto[]> {
    const reponse = await this.clienteService.find();
    return reponse.map((x) => this.mapper.map(x, Cliente, ClienteDto));
  }
  @Get('/query')
  async findQuery(@Query('filter') filter: string): Promise<ClienteDto[]> {
    const reponse = await this.clienteService.findQuery(filter);
    return reponse.map((x) => this.mapper.map(x, Cliente, ClienteDto));
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ClienteDto> {
    const response = await this.clienteService.findById(id);
    return this.mapper.map(response, Cliente, ClienteDto);
  }
  @Post()
  async create(
    @Body(MapPipe(ClienteDto, Cliente))
    dto: Cliente,
  ): Promise<ClienteDto> {
    const response = await this.clienteService.create(dto);
    return this.mapper.map(response, Cliente, ClienteDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(MapPipe(ClienteDto, Cliente)) dto: Cliente,
  ): Promise<ClienteDto> {
    const response = await this.clienteService.update(id, dto);
    return this.mapper.map(response, Cliente, ClienteDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.clienteService.delete(id);
  }
}

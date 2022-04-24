import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoDto } from './atendimento.dto';
import { Atendimento } from './atendimento.entity';
import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Controller('atendimento')
export class AtendimentoController
  implements ICrudController<Atendimento, AtendimentoDto>
{
  constructor(
    private atendimentoService: AtendimentoService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  @Get()
  async find(): Promise<AtendimentoDto[]> {
    const result = await this.atendimentoService.find();
    return this.mapper.mapArray(result, Atendimento, AtendimentoDto);
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AtendimentoDto> {
    const result = await this.atendimentoService.findById(id);
    return this.mapper.map(result, Atendimento, AtendimentoDto);
  }
  @Post()
  async create(
    @Body(MapPipe(AtendimentoDto, Atendimento)) dto: Atendimento,
  ): Promise<AtendimentoDto> {
    const result = await this.atendimentoService.create(dto);
    return this.mapper.map(result, Atendimento, AtendimentoDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(MapPipe(AtendimentoDto, Atendimento)) dto: Atendimento,
  ): Promise<AtendimentoDto> {
    const result = await this.atendimentoService.create(dto);
    return this.mapper.map(result, Atendimento, AtendimentoDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.atendimentoService.delete(id);
  }
}

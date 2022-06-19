import { addProfile, Mapper } from '@automapper/core';
import { InjectMapper, MapPipe } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { ServicoDto } from './servico.dto';
import { Servico } from './servico.entity';
import { ServicoProfile } from './servico.profile';
import { ServicoService } from './servicos.service';

@Controller('servico')
@UseGuards(JwtAuthGuard)
export class ServicoController implements ICrudController<Servico, ServicoDto> {
  constructor(
    private service: ServicoService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly servicoProfile: ServicoProfile,
  ) {
    addProfile(mapper, servicoProfile.profile);
  }

  @Get()
  async find(): Promise<ServicoDto[]> {
    const result = await this.service.find();
    return this.mapper.mapArray(result, Servico, ServicoDto);
  }
  @Post()
  async create(
    @Body(MapPipe(ServicoDto, Servico)) funcionarioDto: Servico,
  ): Promise<ServicoDto> {
    const result = await this.service.create(funcionarioDto);
    return this.mapper.map(result, Servico, ServicoDto);
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ServicoDto> {
    const result = await this.service.findById(id);
    return this.mapper.map(result, Servico, ServicoDto);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(MapPipe(ServicoDto, Servico)) funcionarioDto: Servico,
  ): Promise<ServicoDto> {
    const result = await this.service.update(id, funcionarioDto);
    return this.mapper.map(result, Servico, ServicoDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.service.delete(id);
  }
}

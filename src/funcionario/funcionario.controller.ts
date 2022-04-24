import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FuncionarioDto } from './funcionario.dto';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './funcionario.entity';
import ICrudController from 'src/interfaces/controller/icrudcontroller';
import { InjectMapper } from '@automapper/nestjs';
import { addProfile, Mapper } from '@automapper/core';
import { FuncionarioProfile } from './funcionario.profile';

@Controller('funcionario')
export class FuncionarioController
  implements ICrudController<Funcionario, FuncionarioDto>
{
  constructor(
    private funcionarioService: FuncionarioService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly funcionarioProfile: FuncionarioProfile,
  ) {
    addProfile(mapper, funcionarioProfile.profile);
  }

  @Get()
  async find(): Promise<FuncionarioDto[]> {
    const result = await this.funcionarioService.find();
    return this.mapper.mapArray(result, Funcionario, FuncionarioDto);
  }
  @Post()
  async create(
    @Body() funcionarioDto: FuncionarioDto,
  ): Promise<FuncionarioDto> {
    const result = await this.funcionarioService.create(funcionarioDto);
    return this.mapper.map(result, Funcionario, FuncionarioDto);
  }
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<FuncionarioDto> {
    const result = await this.funcionarioService.findById(id);
    return this.mapper.map(result, Funcionario, FuncionarioDto);
  }
  @Put(':id')
  async update(
    @Param('id') params,
    @Body() funcionarioDto: FuncionarioDto,
  ): Promise<FuncionarioDto> {
    return await this.funcionarioService.update(params.id, funcionarioDto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.funcionarioService.delete(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListDto } from 'src/interfaces/list.dto';
import { FuncionarioDto } from './dto/FuncionarioDto';
import { FuncionarioService } from './funcionario.service';
import { Funcionario } from './schema/funcionarioSchema';

@Controller('funcionario')
export class FuncionarioController {
    constructor(private funcionarioService: FuncionarioService){}
    @Get("/list")
    async list(): Promise<ListDto[]>{
        return await this.funcionarioService.list()
    }
    @Get()
    async findAll(): Promise<Funcionario[]>{
        return await this.funcionarioService.findAll()
    }
    @Post()
    async create(@Body() funcionarioDto:FuncionarioDto): Promise<Funcionario>{
        return await this.funcionarioService.create(funcionarioDto);
    }
    @Get(':id')
    async getOne(@Param() params): Promise<Funcionario>{
        return await this.funcionarioService.findById(params.id);
    }
    @Put(':id')
    async update(@Param() params, @Body() funcionarioDto:FuncionarioDto): Promise<Funcionario>{
        return await this.funcionarioService.update(params.id,funcionarioDto);
    }
    @Delete(':id')
    async Delete(@Param() params): Promise<Funcionario>{
        return await this.funcionarioService.delete(params.id);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListDto } from 'src/interfaces/list.dto';
import { ServicoDto } from './dto/servico.dto';
import { Servico } from './schema/servico.schema';
import { ServicoService } from './servicos.service';

@Controller('servico')
export class ServicoController {
    constructor(private service: ServicoService){}
    @Get("/list")
    async list(): Promise<ListDto[]>{
        return await this.service.list()
    }
    @Get()
    async findAll(): Promise<Servico[]>{
        return await this.service.findAll()
    }
    @Post()
    async create(@Body() funcionarioDto:ServicoDto): Promise<Servico>{
        return await this.service.create(funcionarioDto);
    }
    @Get(':id')
    async getOne(@Param() params): Promise<Servico>{
        return await this.service.findById(params.id);
    }
    @Put(':id')
    async update(@Param() params, @Body() funcionarioDto:ServicoDto): Promise<Servico>{
        return await this.service.update(params.id,funcionarioDto);
    }
    @Delete(':id')
    async Delete(@Param() params): Promise<Servico>{
        return await this.service.delete(params.id);
    }
}

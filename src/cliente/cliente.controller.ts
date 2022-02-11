import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ListDto } from 'src/interfaces/list.dto';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './schema/cliente.schema';

@Controller('cliente')
export class ClienteController {
    constructor(private clienteService:ClienteService){}
    @Get()
    async findAll(): Promise<Cliente[]>{
        return await this.clienteService.findAll()
    }
    @Get("/list")
    async list(): Promise<ListDto[]>{
        return await this.clienteService.list()
    }
    @Post()
    async create(@Body() clienteDto:ClienteDto): Promise<Cliente>{
        return await this.clienteService.create(clienteDto);
    }
    @Get(':id')
    async getOne(@Param() params): Promise<Cliente>{
        return await this.clienteService.findById(params.id);
    }
    @Put(':id')
    async update(@Param() params, @Body() clienteDto:ClienteDto): Promise<Cliente>{
        return await this.clienteService.update(params.id, clienteDto);
    }
    @Delete(':id')
    async Delete(@Param() params): Promise<Cliente>{
        return await this.clienteService.delete(params.id);
    }
}

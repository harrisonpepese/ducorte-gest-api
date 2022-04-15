import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import CrudController from 'src/base/crud.controller';
import IListDtoController from 'src/interfaces/controller/ilistdto.controller';
import { ListDto } from 'src/interfaces/list.dto';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/cliente.dto';
import { Cliente } from './schema/cliente.schema';

@Controller('cliente')
export class ClienteController extends CrudController<Cliente,ClienteDto>{
    constructor(private clienteService:ClienteService){
        super(clienteService)
    }
}

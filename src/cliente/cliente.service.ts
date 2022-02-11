import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Cliente, ClienteDocument } from 'src/cliente/schema/cliente.schema';
import { ListDto } from 'src/interfaces/list.dto';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService extends CrudService<Cliente,ClienteDto> {
    constructor(@InjectModel(Cliente.name) model: Model<ClienteDocument>){
        super(model);
        
    }
    async list():Promise<ListDto[]>{
        const data = await this.findAll();
        return data.map((item):ListDto=>({id:item._id,primary:`${item.nome} ${item.sobrenome}`,secodary:item.telefone}));
    }
}

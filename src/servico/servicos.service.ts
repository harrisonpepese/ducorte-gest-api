import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { ListDto } from 'src/interfaces/list.dto';
import { ServicoDto } from './dto/servico.dto';
import { Servico, ServicoDocument } from './schema/servico.schema';

@Injectable()
export class ServicoService extends CrudService<Servico,ServicoDto>{
    constructor(@InjectModel(Servico.name) model: Model<ServicoDocument>){
        super(model)
    }
    async list():Promise<ListDto[]>{
        const data = await this.findAll();
        return data.map((item):ListDto=>({id:item._id,primary:`${item.nome}`,secodary:`${item.valor}`}));
    }
}

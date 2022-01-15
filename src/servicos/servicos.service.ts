import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { ServicoDto } from './dto/servico.dto';
import { Servico, ServicoDocument } from './schema/servico.schema';

@Injectable()
export class ServicosService extends CrudService<Servico,ServicoDto>{
    constructor(@InjectModel(Servico.name) model: Model<ServicoDocument>){
        super(model)
    }
}

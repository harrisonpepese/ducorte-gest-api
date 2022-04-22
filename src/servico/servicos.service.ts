import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { ListDto } from 'src/interfaces/list.dto';
import { ServicoDto } from './servico.dto';
import { Servico, ServicoDocument } from './servico.entity';

@Injectable()
export class ServicoService extends CrudService<Servico,ServicoDto>{
    constructor(@InjectModel(Servico.name) model: Model<ServicoDocument>){
        super(model)
    }
}

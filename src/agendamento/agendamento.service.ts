import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { AgendamentoDto } from './dto/AgendamentoDto';
import { Agendamento, AgendamentoDocument } from './schema/agendamento.schema';

@Injectable()
export class AgendamentoService extends CrudService<Agendamento,AgendamentoDto>{
    constructor(@InjectModel(Agendamento.name) model: Model<AgendamentoDocument>){
        super(model);
    }
}

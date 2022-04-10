import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { AtendimentoDto } from './dto/AtendimentoDto';
import { Atendimento, AtendimentoDocument } from './schema/atendimento.schema';

@Injectable()
export class AtendimentoService extends CrudService<Atendimento,AtendimentoDto>{
    constructor(@InjectModel(Atendimento.name) model: Model<AtendimentoDocument>){
        super(model);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Servico, ServicoDocument } from './servico.entity';

@Injectable()
export class ServicoService extends CrudService<Servico> {
  constructor(@InjectModel(Servico.name) model: Model<ServicoDocument>) {
    super(model);
  }
}

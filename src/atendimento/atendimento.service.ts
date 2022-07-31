import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Cliente } from 'src/cliente/cliente.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Servico } from 'src/servico/servico.entity';
import { Atendimento, AtendimentoDocument } from './atendimento.entity';

@Injectable()
export class AtendimentoService extends CrudService<Atendimento> {
  constructor(
    @InjectModel(Atendimento.name) model: Model<AtendimentoDocument>,
  ) {
    super(model);
  }
  override async find(): Promise<Atendimento[]> {
    return await this.model
      .find()
      .populate('cliente', null, Cliente.name)
      .populate('funcionario', null, Funcionario.name)
      .populate('servicos', null, Servico.name)
      .exec();
  }

  override async findById(id: string): Promise<Atendimento> {
    return await this.model
      .findById(id)
      .populate('cliente', null, Cliente.name)
      .populate('funcionario', null, Funcionario.name)
      .populate('servicos', null, Servico.name)
      .exec();
  }
}

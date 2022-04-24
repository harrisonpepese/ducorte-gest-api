import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from 'src/cliente/cliente.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import ICrudService from 'src/interfaces/service/icrudservice';
import { Servico } from 'src/servico/servico.entity';
import { AtendimentoDto } from './atendimento.dto';
import { Atendimento, AtendimentoDocument } from './atendimento.entity';

@Injectable()
export class AtendimentoService
  implements ICrudService<Atendimento, AtendimentoDto>
{
  constructor(
    @InjectModel(Atendimento.name) private model: Model<AtendimentoDocument>,
  ) {
    this.model = model;
  }
  create(dto: AtendimentoDto): Promise<Atendimento> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: AtendimentoDto): Promise<Atendimento> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Atendimento> {
    throw new Error('Method not implemented.');
  }
  async find(): Promise<Atendimento[]> {
    return await this.model
      .find()
      .populate('cliente', null, Cliente.name)
      .populate('funcionario', null, Funcionario.name)
      .populate('servicos', null, Servico.name)
      .exec();
  }
  delete(id: string): Promise<Atendimento> {
    throw new Error('Method not implemented.');
  }
}

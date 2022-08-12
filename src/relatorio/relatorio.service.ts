import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import {
  Atendimento,
  AtendimentoDocument,
  AtendimentoStatus,
} from 'src/atendimento/atendimento.entity';
import { Cliente, ClienteDocument } from 'src/cliente/cliente.entity';
import { Servico } from 'src/servico/servico.entity';

@Injectable()
export class RelatorioService {
  clienteModel: Model<ClienteDocument>;
  atendimentoModel: Model<AtendimentoDocument>;
  constructor(
    @InjectModel(Cliente.name) clienteModel: Model<ClienteDocument>,
    @InjectModel(Atendimento.name) atendimentoModel: Model<AtendimentoDocument>,
  ) {
    this.atendimentoModel = atendimentoModel;
    this.clienteModel = clienteModel;
  }

  async dashboard(date: Date | undefined): Promise<any[]> {
    if (!date) {
      date = dayjs().toDate();
    }
    return [
      await this.atendimentosDia(date),
      await this.atendimentosAguardando(date),
      await this.ServicosClienteMedia(date),
      await this.ServicosDia(date),
      await this.ClientesNovosDia(date),
      await this.AtendimentosFinalizados(date),
      await this.TotalVendidoDia(date),
    ];
  }
  public async TotalVendidoDia(date: Date): Promise<any> {
    const { initDate, endDate } = this.getDateRange(new Date());
    const results = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: AtendimentoStatus.finalizado,
      })
      .populate('servicos', null, Servico.name);
    const value = results.reduce((acc, curr) => {
      const value = curr.servicos.reduce((acc, curr) => acc + curr.valor, 0);
      return acc + value;
    }, 0);
    return {
      name: 'Total finalizado R$',
      value: `R$ ${value.toFixed(2)}`.replace('.', ','),
    };
  }
  public async clienteStatics(id: string): Promise<any> {
    const result = await this.atendimentoModel
      .find({
        cliente: id,
        status: AtendimentoStatus.finalizado,
      })
      .sort({ createdAt: 1 });
    return {
      atendimentos: result.length,
      ultimoAtendimento: result.length
        ? dayjs(result[result.length - 1]['createdAt']).format(
            'DD/MM/YYYY hh:mm',
          )
        : 'Não tem',
      totalServicos: result.reduce((acc, curr) => {
        return acc + curr.servicos.length;
      }, 0),
    };
  }
  public async funcionarioStatics(id: string): Promise<any> {
    const { initDate, endDate } = this.getDateRange(new Date());
    const result = await this.atendimentoModel
      .find({
        funcionario: id,
        data: { $gte: initDate, $lte: endDate },
        status: AtendimentoStatus.finalizado,
      })
      .sort({ createdAt: 1 });
    return {
      atendimentos: result.length,
      ultimoAtendimento: result.length
        ? dayjs(result[result.length - 1]['createdAt']).format(
            'DD/MM/YYYY hh:mm',
          )
        : 'Não tem',
      totalServicos: result.reduce((acc, curr) => {
        return acc + curr.servicos.length;
      }, 0),
    };
  }
  public async servicoStatics(id: string): Promise<any> {
    const { initDate, endDate } = this.getDateRange(new Date());
    const result = await this.atendimentoModel
      .find({
        servicos: { $contains: [id] },
        data: { $gte: initDate, $lte: endDate },
        status: AtendimentoStatus.finalizado,
      })
      .sort({ createdAt: 1 });
    return {
      atendimentos: result.length,
      ultimoAtendimento: result.length
        ? dayjs(result[result.length - 1]['createdAt']).format(
            'DD/MM/YYYY hh:mm',
          )
        : 'Não tem',
      totalServicos: result.length,
    };
  }
  private getDateRange(date: Date): { initDate: Date; endDate: Date } {
    return {
      initDate: dayjs(date.toISOString()).startOf('d').toDate(),
      endDate: dayjs(date.toISOString()).endOf('d').toDate(),
    };
  }

  async atendimentosDia(date: Date): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: { $ne: AtendimentoStatus.cancelado },
      })
      .exec();
    return {
      name: 'Atendimento Dia',
      value: result.length,
    };
  }

  async atendimentosAguardando(date: any): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: AtendimentoStatus.aguardando,
      })
      .exec();
    return {
      name: 'Atendimentos Aguardando',
      value: result.length,
    };
  }

  async ServicosClienteMedia(date: any): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: { $ne: AtendimentoStatus.cancelado },
      })
      .exec();
    const clientes = result.length;
    const servicos = result.reduce((acc, curr) => {
      acc += curr.servicos.length;
      return acc;
    }, 0);
    return {
      name: 'Serviços x Clientes',
      value: clientes ? (servicos / clientes).toFixed(2) : 0,
    };
  }

  async ServicosDia(date: any): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: { $ne: AtendimentoStatus.cancelado },
      })
      .exec();
    const servicos = result.reduce((acc, curr) => {
      acc += curr.servicos.length;
      return acc;
    }, 0);
    return {
      name: 'Serviços hoje',
      value: servicos,
    };
  }

  async ClientesNovosDia(date: any): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.clienteModel
      .find({
        createdAt: { $gte: initDate, $lte: endDate },
      })
      .exec();
    return {
      name: 'Clientes novos',
      value: result.length,
    };
  }

  async AtendimentosFinalizados(date: any): Promise<any> {
    const { initDate, endDate } = this.getDateRange(date);
    const result = await this.atendimentoModel
      .find({
        data: { $gte: initDate, $lte: endDate },
        status: AtendimentoStatus.finalizado,
      })
      .exec();
    return {
      name: 'Atendimentos Finalizados',
      value: result.length,
    };
  }
}

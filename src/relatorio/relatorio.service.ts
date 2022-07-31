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
    ];
  }

  private getDateRange(date: Date): { initDate: Date; endDate: Date } {
    return {
      initDate: dayjs(date).startOf('d').toDate(),
      endDate: dayjs(date).endOf('d').toDate(),
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

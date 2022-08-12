import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Funcionario, FuncionarioDocument } from './funcionario.entity';

@Injectable()
export class FuncionarioService extends CrudService<Funcionario> {
  constructor(
    @InjectModel(Funcionario.name) model: Model<FuncionarioDocument>,
  ) {
    super(model);
  }
  public async findQuery(filter: string): Promise<Funcionario[]> {
    return await this.model.find({
      $or: [
        { nome: { $regex: filter, $options: 'i' } },
        { telefone: { $regex: filter, $options: 'i' } },
        { cpf: { $regex: filter, $options: 'i' } },
        { cnpj: { $regex: filter, $options: 'i' } },
      ],
    });
  }
  override async create(dto: Funcionario): Promise<Funcionario> {
    if (await this.checkClientePhoneExists(dto.telefone)) {
      throw new HttpException(
        'Já existe um funcionário com esse telefone na base',
        HttpStatus.BAD_REQUEST,
      );
    }
    const criado = new this.model(dto);
    return criado.save();
  }

  private async checkClientePhoneExists(phoneNumber: string): Promise<boolean> {
    if (await this.model.findOne({ telefone: phoneNumber }, { _id: true })) {
      return true;
    }
    return false;
  }
}

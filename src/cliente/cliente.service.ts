import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Cliente, ClienteDocument } from 'src/cliente/cliente.entity';

@Injectable()
export class ClienteService extends CrudService<Cliente> {
  constructor(@InjectModel(Cliente.name) model: Model<ClienteDocument>) {
    super(model);
  }
  public async findQuery(filter: string): Promise<Cliente[]> {
    return await this.model.find({
      $or: [
        { nome: { $regex: filter, $options: 'i' } },
        { telefone: { $regex: filter, $options: 'i' } },
        { cpf: { $regex: filter, $options: 'i' } },
      ],
    });
  }
  override async create(dto: Cliente): Promise<Cliente> {
    if (await this.checkClientePhoneExists(dto.telefone)) {
      throw new HttpException(
        'Já existe um cliente com esse telefone na base',
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

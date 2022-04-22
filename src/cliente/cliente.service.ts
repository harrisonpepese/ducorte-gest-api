import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Cliente,ClienteDocument } from 'src/cliente/cliente.entity';
import { ClienteDto } from './cliente.dto';

@Injectable()
export class ClienteService extends CrudService<Cliente, ClienteDto> {
  constructor(@InjectModel(Cliente.name) model: Model<ClienteDocument>) {
    super(model);
  }
}

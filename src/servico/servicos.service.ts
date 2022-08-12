import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { Servico, ServicoDocument } from './servico.entity';

@Injectable()
export class ServicoService extends CrudService<Servico> {
  constructor(@InjectModel(Servico.name) model: Model<ServicoDocument>) {
    super(model);
  }
  public async findQuery(filter: string): Promise<Servico[]> {
    return await this.model.find({
      $or: [{ nome: { $regex: filter, $options: 'i' } }],
    });
  }
  override async create(dto: Servico): Promise<Servico> {
    if (await this.checkNameExists(dto.nome)) {
      throw new HttpException(
        'Já existe um serviço com esse nome na base',
        HttpStatus.BAD_REQUEST,
      );
    }
    const criado = new this.model(dto);
    return criado.save();
  }
  private async checkNameExists(name: string) {
    return await this.model.findOne({ nome: name });
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import ICrudService from 'src/interfaces/service/icrudservice';

export class CrudService<entity> implements ICrudService<entity> {
  model: Model<entity & Document>;
  constructor(model: Model<entity & Document>) {
    this.model = model;
  }
  async find(): Promise<entity[]> {
    return this.model.find().exec();
  }
  async create(dto: entity): Promise<entity> {
    const criado = new this.model(dto);
    return criado.save();
  }
  async findById(id: string): Promise<entity> {
    const entity = this.model.findById(id).exec();
    return entity;
  }
  async update(id: string, dto: entity): Promise<any> {
    await this.model.updateOne({ _id: id }, { $set: dto }).exec();
    return this.findById(id);
  }
  async delete(id: string): Promise<any> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new HttpException(
        'Dado não encontrado no sistema',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.model.deleteOne({ _id: id }).exec();
  }
}

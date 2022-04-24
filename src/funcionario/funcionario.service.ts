import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { ListDto } from 'src/interfaces/list.dto';
import { FuncionarioDto } from './funcionario.dto';
import { Funcionario, FuncionarioDocument } from './funcionario.entity';

@Injectable()
export class FuncionarioService extends CrudService<
  Funcionario,
  FuncionarioDto
> {
  constructor(
    @InjectModel(Funcionario.name) model: Model<FuncionarioDocument>,
  ) {
    super(model);
  }
}

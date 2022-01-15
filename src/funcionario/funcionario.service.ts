import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from 'src/base/crud.service';
import { FuncionarioDto } from './dto/FuncionarioDto';
import { Funcionario, FuncionarioDocument } from './schema/funcionarioSchema';

@Injectable()
export class FuncionarioService extends CrudService<Funcionario,FuncionarioDto> {
    constructor(@InjectModel(Funcionario.name) model: Model<FuncionarioDocument>){
        super(model);
    }
}

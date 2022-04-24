import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuncionarioDocument = Funcionario & Document;
@Schema()
export class Funcionario extends Document {
  @Prop()
  @AutoMap()
  nome: string;
  @Prop()
  @AutoMap()
  sobrenome: string;
  @Prop()
  @AutoMap()
  telefone: string;
  @Prop()
  @AutoMap()
  sexo: string;
  @Prop()
  @AutoMap()
  cpf: string;
  @Prop()
  @AutoMap()
  cnpj: string;
  @Prop()
  @AutoMap()
  comissao: number;
}

export const FuncionarioSchema = SchemaFactory.createForClass(Funcionario);

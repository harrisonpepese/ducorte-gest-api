import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServicoDocument = Servico & Document;
@Schema()
export class Servico extends Document {

  @Prop()
  @AutoMap()
  nome: string;
  @Prop()
  @AutoMap()
  descricao: string;
  @Prop()
  @AutoMap()
  valor: number;
  @Prop()
  @AutoMap()
  tempoEstimado: number;
}

export const ServicoSchema = SchemaFactory.createForClass(Servico);

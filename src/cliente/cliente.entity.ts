import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema()
export class Cliente extends Document {
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
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);

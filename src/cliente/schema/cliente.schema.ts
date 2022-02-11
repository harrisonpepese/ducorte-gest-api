import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import BaseEntity from 'src/base/base.entity';

export type ClienteDocument = Cliente & Document;
@Schema()
export class Cliente extends BaseEntity{
    @Prop()
    nome:string
    @Prop()
    sobrenome: string
    @Prop()
    telefone:string
    @Prop()
    sexo:string
    @Prop()
    cpf:string
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
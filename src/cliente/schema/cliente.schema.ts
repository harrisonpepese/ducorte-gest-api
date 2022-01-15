import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;
@Schema()
export class Cliente {
    @Prop()
    sobrenome: string
    @Prop()
    nome:string
    @Prop()
    telefone:string
    @Prop()
    cpf:string
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
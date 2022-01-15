import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuncionarioDocument = Funcionario & Document;
@Schema()
export class Funcionario {
    @Prop()
    sobrenome: string
    @Prop()
    nome:string
    @Prop()
    telefone:string
    @Prop()
    cpf:string
    @Prop()
    cnpj:string
    @Prop()
    comisao:number
}

export const FuncionarioSchema = SchemaFactory.createForClass(Funcionario);
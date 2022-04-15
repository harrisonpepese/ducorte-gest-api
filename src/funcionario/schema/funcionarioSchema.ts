import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FuncionarioDocument = Funcionario & Document;
@Schema()
export class Funcionario{
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
    @Prop()
    cnpj:string
    @Prop()
    comissao:number
}

export const FuncionarioSchema = SchemaFactory.createForClass(Funcionario);
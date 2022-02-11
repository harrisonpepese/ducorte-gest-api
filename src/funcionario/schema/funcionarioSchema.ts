import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import BaseEntity from 'src/base/base.entity';

export type FuncionarioDocument = Funcionario & Document;
@Schema()
export class Funcionario extends BaseEntity{
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
    comisaoServico:number
}

export const FuncionarioSchema = SchemaFactory.createForClass(Funcionario);
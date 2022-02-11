import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import BaseEntity from 'src/base/base.entity';

export type ServicoDocument = Servico & Document;
@Schema()
export class Servico extends BaseEntity {
    @Prop()
    nome:string
    @Prop()
    descricao: string
    @Prop()
    valor:number
    @Prop()
    tempoEstimado:number
}

export const ServicoSchema = SchemaFactory.createForClass(Servico);
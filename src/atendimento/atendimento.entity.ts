import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Cliente } from 'src/cliente/cliente.entity';
import { Funcionario } from 'src/funcionario/funcionario.entity';
import { Servico } from 'src/servico/servico.entity';

export type AtendimentoDocument = Atendimento & Document;
@Schema()
export class Atendimento extends Document{
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' })
   cliente:Cliente
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Funcionario.name })
   funcionario:Funcionario
   @Prop()
   @AutoMap()
   data:Date
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Servico.name })
   @AutoMap(()=>Servico)
   servicos: Servico[]
}

export const AtendimentoSchema = SchemaFactory.createForClass(Atendimento);